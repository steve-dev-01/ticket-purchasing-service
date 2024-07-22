import { Type } from "class-transformer";
import { ArrayNotEmpty, IsDate, IsInt, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";

export class createEventDto {
    @IsString()
    name: string;

    @IsDate()
    @Type(() => Date)

    date: Date;

    @IsString()
    time: string;

    @IsString()
    venue: string;

    @ValidateNested({ each: true })
    @Type(() => TicketCategoryDto)
    @ArrayNotEmpty()
    ticketCategories: TicketCategoryDto[];
}
class TicketCategoryDto {
    @IsString()
    name: string;

    @IsNumber({}, { message: 'Price must be a floating point number' })
    price: number;

    @IsNumber()
    availableTickets: number;
}

export class updateEventDto extends createEventDto { }

export class getAllEventsDto {
    name?: string;
    venue?: string;
    date?: Date;
    time?: string;
    ticketCategoryName?: string;
    minPrice?: string;
    maxPrice?: string;
}