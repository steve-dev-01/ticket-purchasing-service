import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { registerDto } from 'src/auth/dto/register-dto';


@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { }
    async findOne(email: string): Promise<User | undefined> {
        return await this.prisma.user.findUnique({ where: { email } });
    }

    async create(registerdto: registerDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(registerdto.password, 10);

        return await this.prisma.user.create({ data: { ...registerdto, password: hashedPassword } });
    }

    async purchaseHistory(userId: string): Promise<User> {
        return await this.prisma.user.findUnique({
            where: { id: userId },
            include: { tickets: { include: { event: true, ticketCategory: true } } },
        });
    }
}
