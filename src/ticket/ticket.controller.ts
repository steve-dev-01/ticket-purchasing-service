import { Body, Controller, Post } from '@nestjs/common';
import { TicketDto } from './dto/ticket-dto';
import { TicketService } from './ticket.service';
import { ApiResponse } from 'src/shared/utils/api.response/apiResponse';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { JWTPayload } from 'src/shared/interface/global-types';

@Controller('tickets')
export class TicketController {
    constructor(
        private ticketService: TicketService,
        private apiResponse: ApiResponse
    ) { }


    @Post('purchase')
    async purchaseTicket(@Body() purchaseDto: TicketDto, @GetUser() user: JWTPayload) {
        const { id: userId } = user;
        const ticket = await this.ticketService.purchaseTicket(purchaseDto, userId);
        return this.apiResponse.createdSuccess(ticket);
    }
}
