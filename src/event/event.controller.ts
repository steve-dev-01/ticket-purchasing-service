import { Controller, Post, UseGuards, Body, Put, Param, Get, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { createEventDto, getAllEventsDto, updateEventDto } from './dto/event-dto';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { CreateEventInput, UpdateEventInput } from './interfaces/create-event.interface';
import { EventTransformer } from './transformers/event-transformer';
import { ApiResponse } from 'src/shared/utils/api.response/apiResponse';
import { Public } from 'src/shared/decorators/public-auth-guard.decorator';
import { PaginateParams } from 'src/shared/decorators/pagination.decorator';
import { PaginateDto } from 'src/shared/dto/paginate.dto';
import { UtilService } from 'src/shared/utils/utl.service';
import { JWTPayload } from 'src/shared/interface/global-types';
@Controller('events')
export class EventController {

    constructor(
        private eventService: EventService,
        private eventTransformer: EventTransformer,
        private apiResponse: ApiResponse,
        private utilService: UtilService
    ) { }

    @Public()
    @Get('')
    async getAllEvents(@PaginateParams() paginate: PaginateDto, @Query() query: any): Promise<any> {
        const { size, skip, page } = paginate;
        const { page: queryPage, size: querySize, ...payload } = query;

        const [result, count] = await this.eventService.findAll(payload, paginate);
        const meta = this.utilService.constructMeta(count, size, skip);
        const transformedResult = await Promise.all(result.map(event => this.eventTransformer.transform(event)));
        return this.apiResponse.fetchedSuccess({ data: transformedResult, meta });
    }

    @Post('create')
    async create(@Body() eventDto: createEventDto, @GetUser() user: JWTPayload) {
        const { id: creatorId } = user;
        const createEventInput: CreateEventInput = {
            ...eventDto,
            creatorId,
            ticketCategories: eventDto.ticketCategories.map(category => ({
                ...category,
                price: Number(category.price)
            }))
        };
        const event = this.eventService.createEvent(createEventInput);
        const transformEvent = await this.eventTransformer.transform(event);
        return this.apiResponse.createdSuccess(transformEvent);
    }


    @Put('update/:id')
    async update(@Param('id') id: string, @Body() eventDto: updateEventDto, @GetUser() user: JWTPayload) {
        const { id: creatorId } = user;
        await this.eventService.findByEventIdAndUserId(id, creatorId)
        const updateEventInput: UpdateEventInput = {
            id,
            ...eventDto,
            creatorId,
            ticketCategories: eventDto.ticketCategories.map(category => ({
                ...category,
                price: Number(category.price)
            }))
        };
        const event = this.eventService.updateEvent(id, updateEventInput);
        const transformEvent = await this.eventTransformer.transform(event);
        return this.apiResponse.updatedSuccess(transformEvent);
    }
}