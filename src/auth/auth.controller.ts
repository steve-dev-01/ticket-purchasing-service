import { Controller, Post, Body } from '@nestjs/common';
import { registerDto } from './dto/register-dto';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login-dto';
import { Public } from 'src/shared/decorators/public-auth-guard.decorator';
import { Throttle } from '@nestjs/throttler';
import { UserTransformer } from 'src/user/transformers/user-transformer';
import { ApiResponse } from 'src/shared/utils/api.response/apiResponse';


@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private userTransformer: UserTransformer,
        private apiResponse: ApiResponse,
    ) { }
    @Public()
    @Post('register')
    async register(@Body() registerdto: registerDto) {
        const register = await this.authService.register(registerdto);
        const tranformedUser = await this.userTransformer.transform(Promise.resolve(register.user));

        return this.apiResponse.registerSucess({ user: tranformedUser, jwt: register.jwt });

    }

    @Public()
    @Post('login')
    async login(@Body() logindto: loginDto) {
        const login = await this.authService.login(logindto);
        const tranformedUser = await this.userTransformer.transform(Promise.resolve(login.user));
        return this.apiResponse.loginSuccess({ user: tranformedUser, jwt: login.jwt });
    }
}
