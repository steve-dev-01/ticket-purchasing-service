import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UtilModule } from './shared/utils/util.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { ApiResponseModule } from './shared/utils/api.response/api-response.module';
import { EventModule } from './event/event.module';
import { AuthGuard } from './auth/guard/auth-guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TicketModule } from './ticket/ticket.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    UtilModule,
    PrismaModule,
    PassportModule,
    ApiResponseModule,
    EventModule,
    JwtModule,
    TicketModule,
    ThrottlerModule.forRoot([{
      ttl: 20000, // The TTL is set to 20000 milliseconds (20 seconds)
      limit: 5,
    }]),
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule { }
