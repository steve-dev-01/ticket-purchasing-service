import { IsOptional } from 'class-validator';
import { ValidateOrder } from '../decorators/validate-order.decorator';


export class SortQueryDto {
    @IsOptional()
    sort_by: string;

    @IsOptional()
    @ValidateOrder()
    order_by: string;
}
