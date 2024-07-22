import { HttpException, Injectable } from '@nestjs/common';
import { registerDto } from './dto/register-dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse } from 'src/shared/utils/api.response/apiResponse';
import { loginDto } from './dto/login-dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,

    ) { }
    async register(registerdto: registerDto) {
        const isUserExist = await this.userService.findOne(registerdto.email);
        if (isUserExist) {
            throw new HttpException('User Already Exist', 409);
        }
        const user = await this.userService.create(registerdto);
        const jwt = await this.jwtService.signAsync(user);
        return { user, jwt };
    }

    async login(logindto: loginDto) {
        const user = await this.userService.findOne(logindto.email);
        if (!user) {
            throw new HttpException('User Not Found', 404);
        }
        const isPasswordValid = await this.comparePassword(logindto.password, user.password);
        if (!isPasswordValid) {
            throw new HttpException('Invalid Password', 401);
        }
        const jwt = await this.jwtService.signAsync(user);
        return { user, jwt };

    }

    private async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

}
