import {
    Catch,
    ExceptionFilter,
    ArgumentsHost,
    Logger,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(PrismaExceptionFilter.name);

    catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        this.logger.error('Exception message', exception.message);

        let prismaExcep = {} as PrismaErr;
        const error = exception.message.replace(/\n/g, '');
        const IdNotFoundError =
            error.includes('delete()') || error.includes('update()');
        const NotFoundForeignKeyError =
            error.includes('create()') ||
            error.includes('update()') ||
            error.includes('updateMany()') ||
            error.includes('createMany()');

        switch (exception.code) {
            case 'P2002':
                prismaExcep = {
                    errorName: exception.name,
                    statusCode: HttpStatus.CONFLICT,
                    message: 'Resource already exists.',
                    error,
                };
                break;
            case 'P2003':
                prismaExcep = {
                    errorName: exception.name,
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: NotFoundForeignKeyError
                        ? 'Invalid foreign key.'
                        : 'Resource is in use.',
                    error,
                };
                break;
            case 'P2025':
                prismaExcep = {
                    errorName: exception.name,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: IdNotFoundError
                        ? 'ID not found.'
                        : 'Resource not found.',
                    error,
                };
                break;
            default:
                prismaExcep = {
                    errorName: exception.name,
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'An unknown error occurred.',
                    error,
                };
                break;
        }

        response
            .status(prismaExcep.statusCode)
            .json({
                statusCode: prismaExcep.statusCode,
                message: prismaExcep.message,
                error: prismaExcep.error,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}

type PrismaErr = {
    errorName: string;
    statusCode: number;
    message: string;
    error?: string;
};
