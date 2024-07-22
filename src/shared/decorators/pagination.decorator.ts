// decorators/paginate-params.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PaginateParams = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const page = parseInt(request.query.page, 10) || 1;
        const size = parseInt(request.query.size, 10) || 10;
        const skip = (page - 1) * size;

        return { page, size, skip };
    },
);
