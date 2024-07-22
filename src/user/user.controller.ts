import { Controller, Get } from '@nestjs/common';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { UserService } from './user.service';
import { ApiResponse } from 'src/shared/utils/api.response/apiResponse';
import { UserTransformer } from './transformers/user-transformer';
import { JWTPayload } from 'src/shared/interface/global-types';

@Controller('users')
export class UserController {

    constructor(
        private userService: UserService,
        private apiResponse: ApiResponse,
        private userTransformer: UserTransformer
    ) { }

    @Get('purchase/history')
    async purchaseHistory(@GetUser() user: JWTPayload) {
        const purchaseHistory = await this.userService.purchaseHistory(user.id);
        const transformedUser = await this.userTransformer.transform(Promise.resolve(purchaseHistory));
        return this.apiResponse.fetchedSuccess(transformedUser);
    }

}
