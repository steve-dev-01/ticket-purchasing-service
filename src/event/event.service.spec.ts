// event.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Event, TicketCategory } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

describe('EventService', () => {
  let service: EventService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn(),
            event: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
            ticketCategory: {
              create: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  const id = uuidv4();

  it('should create an event with ticket categories', async () => {
    const createEventInput = {
      name: 'Concert',
      date: new Date('2024-09-20T19:00:00.000Z'),
      time: '19:00',
      venue: 'Stadium',
      creatorId: id,
      ticketCategories: [
        { name: 'VIP', price: 100, availableTickets: 50 }
      ],
    };

    const event: Event = {
      id: id,
      ...createEventInput,
      created_date: new Date('2024-07-21T04:48:08.030Z'),
      updated_date: new Date('2024-07-21T04:48:08.030Z'),
    };

    const ticketCategories: TicketCategory[] = [
      {
        id: '28bf4fdb-29a4-4b54-bf2a-34492520ccda',
        name: 'VIP',
        price: 100,
        availableTickets: 50,
        eventId: id,
        created_date: new Date('2024-07-21T04:48:08.030Z'),
        updated_date: new Date('2024-07-21T04:48:08.030Z'),
      }
    ];

    (prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      return callback({
        event: prisma.event,
        ticketCategory: prisma.ticketCategory,
      });
    });

    (prisma.event.create as jest.Mock).mockResolvedValue(event);
    (prisma.ticketCategory.create as jest.Mock).mockResolvedValue(ticketCategories[0]);
    (prisma.event.findUnique as jest.Mock).mockResolvedValue({
      ...event,
      ticketCategories,
      creator: { id: id, name: 'Steve', email: 'steve1@gmail.com' },
    });

    const result = await service.createEvent(createEventInput);

    expect(result).toEqual({
      ...event,
      ticketCategories,
      creator: { id: id, name: 'Steve', email: 'steve1@gmail.com' },
    });

    expect(prisma.event.create).toHaveBeenCalledWith({
      data: {
        name: 'Concert',
        date: new Date('2024-09-20T19:00:00.000Z'),
        time: '19:00',
        venue: 'Stadium',
        creatorId: id,
      },
    });

    expect(prisma.ticketCategory.create).toHaveBeenCalledTimes(1);
    expect(prisma.ticketCategory.create).toHaveBeenCalledWith({
      data: {
        name: 'VIP',
        price: 100,
        availableTickets: 50,
        eventId: id,
      },
    });

    expect(prisma.event.findUnique).toHaveBeenCalledWith({
      where: { id: id },
      include: { ticketCategories: true, creator: true },
    });
  });


});