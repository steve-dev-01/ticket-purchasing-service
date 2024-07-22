import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { ApiResponse } from 'src/shared/utils/api.response/apiResponse';
import { UserService } from './user.service';
import { UserTransformer } from './transformers/user-transformer';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/shared/prisma/prisma.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiResponse, UserService, UserTransformer, PrismaService],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  const testDate = new Date();
  const id = uuidv4();

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return purchase history with correct keys', async () => {
    const mockGetUserId = id;
    const mockResponse = {
      message: 'Data fetched successfully.',
      data: {
        id: id,
        name: 'Steve',
        email: 'steve1@gmail.com',
        password: 'hashedPassword',
        tickets: [
          {
            id: id,
            event: {
              id: id,
              name: 'Concert 12',
              date: testDate,
              time: '19:00',
              venue: 'Stadium',
              creatorId: id,
              created_date: testDate,
              updated_date: testDate,
            },
            ticketCategory: {
              id: id,
              name: 'VIP',
              price: 100,
              eventId: id,
              availableTickets: 4,
              created_date: testDate,
              updated_date: testDate,
            },
            quantity: 2,
            date: testDate,
            updated_date: testDate,
          },
        ],
        created_date: testDate,
        updated_date: testDate,
      },
    };

    jest.spyOn(service, 'purchaseHistory').mockResolvedValue(mockResponse.data);

    const result = await controller.purchaseHistory({ id: mockGetUserId });

    // Check that the response has the correct structure and keys
    expect(result).toEqual(
      expect.objectContaining({
        message: 'Data fetched successfully.',
        data: expect.objectContaining({
          id: id,
          name: 'Steve',
          email: 'steve1@gmail.com',
          tickets: expect.arrayContaining([
            expect.objectContaining({
              event: expect.objectContaining({
                creatorId: expect.any(String),
                date: expect.any(Date),
                id: expect.any(String),
                name: 'Concert 12',
                time: '19:00',
                venue: 'Stadium',
              }),
              id: expect.any(String),
              quantity: 2,
              ticketCategory: expect.objectContaining({
                availableTickets: 4,
                eventId: expect.any(String),
                id: expect.any(String),
                name: 'VIP',
              }),
            }),
          ]),
          created_date: testDate,
          updated_date: testDate,
        }),
      })
    );

    expect(service.purchaseHistory).toHaveBeenCalledWith(mockGetUserId);
  });
});
