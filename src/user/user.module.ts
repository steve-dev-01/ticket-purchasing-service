import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserTransformer } from './transformers/user-transformer';

@Module({
  controllers: [UserController],
  providers: [UserService, UserTransformer],
  exports: [UserService],
})
export class UserModule { }
