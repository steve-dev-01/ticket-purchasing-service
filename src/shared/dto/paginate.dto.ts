import { IsInt, IsOptional } from 'class-validator';

export class PaginateDto {
    @IsInt()
    @IsOptional()
    skip: number;

    @IsInt()
    @IsOptional()
    size: number;

    @IsOptional()
    page: number;

}
