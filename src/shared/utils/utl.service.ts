import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UtilService {

    constructMeta(totalItems: number, pageSize: number, skip: number) {
        const currentPage = Math.floor(skip / pageSize) + 1;
        const totalPages = Math.ceil(totalItems / pageSize);
        return {
            totalItems,
            totalPages,
            currentPage,
            pageSize,
        };
    }

}
