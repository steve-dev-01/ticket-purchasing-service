export interface TicketCategory {
    name: string;
    price: number;
    availableTickets: number;
}

export interface CreateEventInput {
    name: string;
    date: Date;
    time: string;
    venue: string;
    creatorId: string;
    ticketCategories: TicketCategory[];
}

export interface UpdateEventInput extends CreateEventInput {
    id: string;
}
