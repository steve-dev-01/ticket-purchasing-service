import { Injectable, NotFoundException } from '@nestjs/common';
import { createEventDto, getAllEventsDto } from './dto/event-dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Event, TicketCategory } from '@prisma/client';
import { CreateEventInput, UpdateEventInput } from './interfaces/create-event.interface';
import { PaginateDto } from 'src/shared/dto/paginate.dto';

@Injectable()
export class EventService {
    constructor(
        private prismaService: PrismaService
    ) { }
    async createEvent(createEventInput: CreateEventInput): Promise<Event> {
        const { ticketCategories, ...eventData } = createEventInput;

        return this.prismaService.$transaction(async (tx) => {
            try {
                const event = await tx.event.create({
                    data: eventData,
                });

                if (!event || !event.id) {
                    throw new Error("Failed to create event or event ID is missing");
                }

                const ticketCategoryPromises = ticketCategories.map((category: TicketCategory) =>
                    tx.ticketCategory.create({
                        data: {
                            ...category,
                            eventId: event.id,
                        },
                    }),
                );
                await Promise.all(ticketCategoryPromises);

                return tx.event.findUnique({
                    where: { id: event.id },
                    include: { ticketCategories: true, creator: true },
                });
            } catch (e) {
                console.error("Error in createEvent transaction: ", e);
                throw new Error('Failed to create event');
            }
        });
    }


    async updateEvent(id: string, updateEventInput: UpdateEventInput): Promise<Event> {
        const { ticketCategories, ...eventData } = updateEventInput;

        return this.prismaService.$transaction(async (tx) => {
            try {
                const event = await tx.event.update({
                    where: { id },
                    data: eventData,
                });

                if (!event || !event.id) {
                    throw new Error("Failed to update event or event ID is missing");
                }

                // Delete existing ticket categories for the event
                await tx.ticketCategory.deleteMany({
                    where: { eventId: event.id },
                });

                // Create new ticket categories
                const ticketCategoryPromises = ticketCategories.map((category) =>
                    tx.ticketCategory.create({
                        data: {
                            ...category,
                            eventId: event.id,
                        },
                    }),
                );
                await Promise.all(ticketCategoryPromises);

                return tx.event.findUnique({
                    where: { id: event.id },
                    include: { ticketCategories: true, creator: true },
                });
            } catch (e) {
                console.error("Error in updateEvent transaction: ", e);
                throw new Error('Failed to update event');
            }
        });
    }



    async findByEventIdAndUserId(eventId: string, userId: string): Promise<Event> {
        const event = await this.prismaService.event.findUnique({
            where: {
                id: eventId,
                creatorId: userId,
            },
            include: { ticketCategories: true, creator: true },
        });

        if (!event) {
            throw new NotFoundException('Event not found');
        }

        return event;
    }


    async findAll(payload: getAllEventsDto, pagination: PaginateDto): Promise<[Event[], number]> {
        const { size, skip } = pagination;
        const { ticketCategoryName, minPrice, maxPrice, ...filters } = payload;

        const events = await this.prismaService.event.findMany({
            where: {
                ...filters,
                ticketCategories: {
                    some: {
                        name: ticketCategoryName ? { contains: ticketCategoryName, mode: 'insensitive' } : undefined,
                        price: {
                            gte: minPrice !== undefined ? parseFloat(minPrice) : undefined,
                            lte: maxPrice !== undefined ? parseFloat(maxPrice) : undefined,
                        },
                    },
                },
            },
            take: size,
            skip,
            orderBy: {
                created_date: 'desc',
            },
            include: {
                ticketCategories: true,
                creator: true,
            },
        });

        const count = await this.prismaService.event.count({
            where: {
                ...filters,
                ticketCategories: {
                    some: {
                        name: ticketCategoryName ? { contains: ticketCategoryName, mode: 'insensitive' } : undefined,
                        price: {
                            gte: minPrice !== undefined ? parseFloat(minPrice) : undefined,
                            lte: maxPrice !== undefined ? parseFloat(maxPrice) : undefined,
                        },
                    },
                },
            },
        });

        return [events, count];
    }

}
