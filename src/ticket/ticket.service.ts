import { HttpException, Injectable } from '@nestjs/common';
import { TicketDto } from './dto/ticket-dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { ApiResponse } from 'src/shared/utils/api.response/apiResponse';

@Injectable()
export class TicketService {
    constructor(
        private prismaService: PrismaService,
        private apiResponse: ApiResponse
    ) { }

    async purchaseTicket(ticketDto: TicketDto, userId: string) {
        const existEvent = await this.checkEvent(ticketDto.eventId, ticketDto.ticketCategoryId);
        const availableTickets = (existEvent as { ticketCategories: any[] }).ticketCategories.filter(category => category.availableTickets !== 0
        );
        const exceedQty = availableTickets.find(category => category.availableTickets < ticketDto.quantity);
        if (exceedQty) {
            throw new HttpException(`Quantity exceeds the available tickets for ${exceedQty.name}, available ticket is ${exceedQty.availableTickets}`, 400);
        }
        if (availableTickets.length === 0) {
            throw new HttpException('No tickets available', 404);
        }
        const ticket = await this.prismaService.ticket.create({ data: { ...ticketDto, userId: userId } });
        await this.reduceTicketQuantity(ticketDto.ticketCategoryId, ticketDto.quantity);
        const result = await this.prismaService.ticket.findUnique({
            where: {
                id: ticket.id
            },
            include: {
                event: true,
                ticketCategory: true,
            }
        });

        return result;
    }

    async checkEvent(eventId: string, ticketCategoryId: string) {
        const result = await this.prismaService.event.findUnique({
            where: {
                id: eventId,
                ticketCategories: { some: { id: ticketCategoryId } }
            },
            include: { ticketCategories: true }
        });
        if (!result) {
            throw new HttpException('Event are not found or Ticket Categorty Not found', 404);
        }

        return result;
    }

    async reduceTicketQuantity(ticketCategoryId: string, quantity: number) {
        const redueticket = await this.prismaService.ticketCategory.update({
            where: { id: ticketCategoryId },
            data: { availableTickets: { decrement: quantity } }
        });
        if (!redueticket) {
            throw new HttpException('Failed to reduce ticket quantity', 500);
        }
        return redueticket;
    }

}
