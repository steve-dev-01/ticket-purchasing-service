// event.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventTransformer } from './transformers/event-transformer';
import { ApiResponse } from 'src/shared/utils/api.response/apiResponse';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UtilService } from 'src/shared/utils/utl.service';

describe('EventController', () => {
  let controller: EventController;
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        EventService,
        EventTransformer,
        ApiResponse,
        UtilService,
        {
          provide: PrismaService,
          useValue: {
            event: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
            ticketCategory: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<EventController>(EventController);
    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an event and return the response', async () => {
    const createEventDto = {
      name: 'Concert',
      date: new Date('2024-09-20T19:00:00.000Z'),
      time: '19:00',
      venue: 'Stadium',
      ticketCategories: [
        {
          name: 'VIP',
          price: 100.0,
          availableTickets: 50,
        }
      ],
    };

    const user = { id: 'e019603d-1000-4978-9a06-085a179cd63f', name: 'Steve', email: 'steve1@gmail.com' };

    const createdEvent = {
      id: '987ba511-7e88-420a-975c-d4ace32bf41b',
      ...createEventDto,
      creatorId: user.id,
      ticketCategories: [
        { id: '5d19d8ef-75c5-496e-bf1a-e4db268872ca', name: 'General Admission', price: 50, availableTickets: 100 }
      ],
      availableTickets: 100,
      created_date: new Date('2024-07-21T04:48:08.030Z'),
      updated_date: new Date('2024-07-21T04:48:08.030Z'),
    };

    const transformedEvent = {
      ...createdEvent,
      creator: user,
      ticketCategories: [
        { id: '5d19d8ef-75c5-496e-bf1a-e4db268872ca', name: 'General Admission', price: 50, availableTickets: 100 }],
      availableTickets: 100,
    };

    jest.spyOn(service, 'createEvent').mockResolvedValue(createdEvent as any);
    jest.spyOn(controller['eventTransformer'], 'transform').mockResolvedValue(transformedEvent);
    jest.spyOn(controller['apiResponse'], 'createdSuccess').mockReturnValue({
      message: 'Data created successfully.',
      data: transformedEvent,
    });

    const result = await controller.create(createEventDto, user);

    expect(service.createEvent).toHaveBeenCalledWith(expect.objectContaining({
      ...createEventDto,
      creatorId: user.id,
    }));

    expect(controller['apiResponse'].createdSuccess).toHaveBeenCalledWith(transformedEvent);

    expect(result).toEqual({
      message: 'Data created successfully.',
      data: transformedEvent,
    });
  });

  it('should update an event and return the response', async () => {
    const updateEventDto = {
      name: 'Updated Concert',
      date: new Date('2024-09-21T19:00:00.000Z'),
      time: '20:00',
      venue: 'Updated Stadium',
      ticketCategories: [
        {
          name: 'VIP',
          price: 150.0,
          availableTickets: 30,
        },
      ],
    };

    const user = { id: 'e019603d-1000-4978-9a06-085a179cd63f', name: 'Steve', email: 'steve1@gmail.com' };
    const eventId = '987ba511-7e88-420a-975c-d4ace32bf41b';

    const existingEvent = {
      id: eventId,
      name: 'Concert',
      date: new Date('2024-09-20T19:00:00.000Z'),
      time: '19:00',
      venue: 'Stadium',
      creatorId: user.id,
      ticketCategories: [
        { id: '5d19d8ef-75c5-496e-bf1a-e4db268872ca', name: 'VIP', price: 100, availableTickets: 50 },
      ],
      availableTickets: 50,
      created_date: expect.any(Date),
      updated_date: expect.any(Date),
    };

    const updatedEvent = {
      id: eventId,
      ...updateEventDto,
      creatorId: user.id,
      ticketCategories: [
        { id: expect.any(String), name: 'VIP', price: 150, availableTickets: 30 },
      ],
      availableTickets: 30
    };

    const transformedEvent = {
      ...updatedEvent,
      creator: user,
      ticketCategories: [
        { id: expect.any(String), name: 'VIP', price: 150, availableTickets: 30 },
      ],
      availableTickets: 30,
    };

    jest.spyOn(service, 'updateEvent').mockResolvedValue(updatedEvent as any);
    jest.spyOn(service, 'findByEventIdAndUserId').mockResolvedValue(existingEvent as any);
    jest.spyOn(controller['eventTransformer'], 'transform').mockResolvedValue(transformedEvent);
    jest.spyOn(controller['apiResponse'], 'updatedSuccess').mockReturnValue({
      message: 'Data updated successfully.',
      data: transformedEvent,
    });

    const result = await controller.update(eventId, updateEventDto, user);

    expect(service.updateEvent).toHaveBeenCalledWith(eventId, expect.objectContaining({
      ...updateEventDto,
      creatorId: user.id,
    }));

    await expect(controller['apiResponse'].updatedSuccess).toHaveBeenCalledWith(transformedEvent);

    expect(result).toEqual({
      message: 'Data updated successfully.',
      data: transformedEvent,
    });
  });
});