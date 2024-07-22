import { plainToClass } from 'class-transformer';
import { UserService } from '../user.service';
export class UserTransformer {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async transform(eventPromise: Promise<any>): Promise<any> {
        const user = await (eventPromise instanceof Promise ? eventPromise : Promise.resolve(eventPromise));

        if (!user) {
            throw new Error('User object is undefined');
        }

        const TicketTransformer = {
            transform: (ticket: any) => ({
                id: ticket.id,
                event: ticket.event,
                ticketCategory: ticket.ticketCategory,
                quantity: ticket.quantity,
                created_date: ticket.created_date,
                updated_date: ticket.updated_date,
            }),
        };

        const transformUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            tickets: user.tickets ? await Promise.all(user.tickets.map((ticket: any) => TicketTransformer.transform(ticket))) : [],
            created_date: user.created_date,
            updated_date: user.updated_date,
        };

        return transformUser
    }
}
