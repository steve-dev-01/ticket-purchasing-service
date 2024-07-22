import { plainToClass } from 'class-transformer';
import { EventService } from '../event.service';
import { TicketCategory, User } from '@prisma/client';

export class EventTransformer {
    private eventService: EventService;

    constructor(eventService: EventService) {
        this.eventService = eventService;
    }

    async transform(eventPromise: Promise<any> | any, pagination?: { totalItems: number; pageSize: number }): Promise<any> {
        const event = await (eventPromise instanceof Promise ? eventPromise : Promise.resolve(eventPromise));

        if (!event) {
            throw new Error('Event object is undefined');
        }

        const TicketCategoryTransformer = {
            transform: (category: TicketCategory) => ({
                id: category.id,
                name: category.name,
                price: parseFloat(category.price.toFixed(2)),
                availableTickets: category.availableTickets,
            }),
        };

        const creatorTransformer = {
            transform: (creator: User) => {
                if (!creator) {
                    console.log('Creator is undefined');
                    return null;
                }
                return {
                    id: creator.id,
                    name: creator.name,
                    email: creator.email,
                };
            },
        };

        const totalAvailableTickets = event.ticketCategories?.reduce((sum: number, category: TicketCategory) => sum + category.availableTickets, 0) || 0;

        const transformEvent = {
            id: event.id,
            name: event.name,
            date: event.date,
            time: event.time,
            venue: event.venue,
            creator: event.creator ? await creatorTransformer.transform(event.creator) : null,
            ticketCategories: event.ticketCategories ? await Promise.all(event.ticketCategories.map((category: any) => TicketCategoryTransformer.transform(category))) : [],
            availableTickets: totalAvailableTickets,
            created_date: event.created_date,
            updated_date: event.updated_date,
        };

        if (pagination) {
            return {
                data: transformEvent,
                meta: {
                    totalItems: pagination.totalItems,
                    totalPages: Math.ceil(pagination.totalItems / pagination.pageSize),
                    pageSize: pagination.pageSize,
                },
            };
        }

        return transformEvent;
    }
}
