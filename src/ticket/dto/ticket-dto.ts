import { IsNotEmpty, Max, Min, Validate } from "class-validator";

export class TicketDto {

    @IsNotEmpty()
    eventId: string;

    @IsNotEmpty()
    ticketCategoryId: string;

    @IsNotEmpty()
    @Min(1)
    @Max(5)
    quantity: number;

}