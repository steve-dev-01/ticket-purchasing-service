import { Injectable } from '@nestjs/common';
import { findAllMeta } from 'src/shared/interface/global-types';

@Injectable()
export class ApiResponse {
    private readonly COPY_MESSAGE = 'Copied successfully';
    private readonly NOT_FOUND_MESSAGE = 'Data not found.';
    private readonly FETCH_MESSAGE = 'Data fetched successfully.';
    private readonly CREATE_MESSAGE = 'Data created successfully.';
    private readonly UPDATE_MESSAGE = 'Data updated successfully.';
    private readonly DELETE_MESSAGE = 'Data deleted successfully.';
    private readonly ATTACHMENT_UPLOAD_MESSAGE = 'Attachment uploaded successfully.';
    private readonly Login_Message = 'Login Successful';
    private readonly Register_Message = 'Register Successful';


    fetchedSuccess(
        data: Record<string, any>[] | Record<string, any> | null,
        meta?: findAllMeta,
    ) {
        const message = !data
            ? this.NOT_FOUND_MESSAGE
            : data && data.length === 0
                ? this.NOT_FOUND_MESSAGE
                : Object.keys(data).length === 0
                    ? this.NOT_FOUND_MESSAGE
                    : this.FETCH_MESSAGE;

        return { message, data, meta };
    }

    createdSuccess(data: Record<string, any> | Record<string, any>[]) {
        return {
            message: this.CREATE_MESSAGE,
            data,
        };
    }

    updatedSuccess(data: Record<string, any>) {
        return {
            message: this.UPDATE_MESSAGE,
            data,
        };
    }

    deletedSuccess(data: Record<string, any>) {
        return {
            message: this.DELETE_MESSAGE,
            data,
        };
    }

    loginSuccess(data: Record<string, any>) {
        return {
            message: this.Login_Message,
            data,
        };
    }

    registerSucess(data: Record<string, any>) {
        return {
            message: this.Register_Message,
            data,
        };
    }

    uploadedSuccess(data: Record<string, any>[] | Record<string, any> | null) {
        return {
            message: this.ATTACHMENT_UPLOAD_MESSAGE,
            data,
        };
    }

    copiedSuccess(data: Record<string, any>[] | Record<string, any> | null) {
        return {
            message: this.COPY_MESSAGE,
            data,
        };
    }

    isEmptyObject(obj: Record<string, any>) {
        return Object.keys(obj).length === 0;
    }

    customSuccess(
        data: Record<string, any>[] | Record<string, any> | null,
        message: string,
    ) {
        return {
            message: message,
            data,
        };
    }

    customMessage(message: string, code: number) {
        return {
            message,
            'statusCode': code
        };
    }

}
