import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EventTransformer } from './transformers/event-transformer';

@Module({
  providers: [EventService, JwtService, EventTransformer],
  controllers: [EventController]
})
export class EventModule { }
