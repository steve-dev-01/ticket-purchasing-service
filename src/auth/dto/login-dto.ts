import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class loginDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
}