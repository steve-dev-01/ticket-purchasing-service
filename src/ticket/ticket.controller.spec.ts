import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './ticket.controller';
import { ApiResponse } from 'src/shared/utils/api.response/apiResponse';
import { TicketService } from './ticket.service';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/shared/prisma/prisma.service';

describe('TicketController', () => {
  let controller: TicketController;
  let ticketService: TicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiResponse, TicketService, PrismaService],
      controllers: [TicketController],
    }).compile();

    controller = module.get<TicketController>(TicketController);
    ticketService = module.get<TicketService>(TicketService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  const testDate = new Date();
  const id = uuidv4();

  describe('purchaseTicket', () => {
    it('should purchase a ticket and return the created ticket', async () => {
      const purchaseDto = {
        eventId: id,
        ticketCategoryId: id,
        quantity: 1,
      }
      const userId = id;
      const mockResponse = {
        message: 'Data created successfully.',
        data: {
          id: id,
          userId: id,
          ticketCategoryId: id,
          eventId: id,
          quantity: 2,
          created_date: testDate,
          updated_date: testDate,
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
            availableTickets: 18,
            created_date: testDate,
            updated_date: testDate,
          },
        },
      };
      jest.spyOn(ticketService, 'purchaseTicket').mockResolvedValue(mockResponse.data);
      const result = await controller.purchaseTicket(purchaseDto, { id: userId });
      expect(result).toEqual(mockResponse);
    });

    it('should return error if ticket purchase quantiy is greater than 5', async () => {
      const purchaseDto = { eventId: id, ticketCategoryId: id, quantity: 6 };
      const userId = 'some-user-id';
      const mockErrorResponse = {
        message: "Quantity exceeds the available tickets for VIP, available ticket is 4",
        statusCode: 400,
      };
      jest.spyOn(ticketService, 'purchaseTicket').mockImplementation(async () => {
        throw new Error("Quantity exceeds the available tickets for VIP, available ticket is 4");
      });

      // Act & Assert
      await expect(controller.purchaseTicket(purchaseDto, { id: userId }))
        .rejects
        .toThrow(mockErrorResponse.message);
    });

    it('should return error if eventId or ticketCategoryId is not found', async () => {
      const purchaseDto = { eventId: id, ticketCategoryId: id, quantity: 1 };
      const userId = id;
      jest.spyOn(ticketService, 'purchaseTicket').mockImplementation(async () => {
        throw new Error("Event are not found or Ticket Categorty Not found");
      });
      const mockErrorResponse = {
        message: "Event are not found or Ticket Categorty Not found",
        statusCode: 404,
      };

      await expect(controller.purchaseTicket(purchaseDto, { id: userId }))
        .rejects
        .toThrow(mockErrorResponse.message);
    });
  });
});
