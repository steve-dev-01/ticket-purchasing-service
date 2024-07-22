import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class registerDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
}