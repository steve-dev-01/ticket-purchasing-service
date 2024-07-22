import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from './ticket.service';
import { ApiResponse } from 'src/shared/utils/api.response/apiResponse';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/shared/prisma/prisma.service';

describe('TicketService', () => {
  let service: TicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketService, ApiResponse, PrismaService],
    }).compile();

    service = module.get<TicketService>(TicketService);
  });

  const id = uuidv4();

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


});
