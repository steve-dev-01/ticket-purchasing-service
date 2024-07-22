import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { v4 as uuidv4 } from 'uuid';
import { UserTransformer } from 'src/user/transformers/user-transformer';
import { ApiResponse } from 'src/shared/utils/api.response/apiResponse';
describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let tranformedUser: UserTransformer;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),

  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        UserTransformer,
        ApiResponse,
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    tranformedUser = module.get<UserTransformer>(UserTransformer);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register successfully', async () => {
    const mockRegisterDto = {
      email: 'test@example.com',
      password: 'A!2b@3C#4d$',
      name: 'Test User',
    };

    const mockResponse = {
      message: 'Register Successful',
      data: {
        user: {
          id: uuidv4(),
          email: 'test@example.com',
          name: 'Test User',
          password: 'hashedPassword',
          created_date: new Date(),
          updated_date: new Date(),
        },
        jwt: 'jwt_token',
      },
    };

    jest.spyOn(service, 'register').mockResolvedValue(mockResponse.data);

    const result = await controller.register(mockRegisterDto);
    const transformedUser = await tranformedUser.transform(result.data.user);

    expect(result).toMatchObject({
      message: 'Register Successful',
      data: {
        user: transformedUser,
        jwt: expect.any(String),
      },
    });
    expect(service.register).toHaveBeenCalledWith(mockRegisterDto);
  });


  it('should login successfully', async () => {
    const mockLoginDto = {
      email: 'test@example.com',
      password: 'A!2b@3C#4d$',
    };
    const mockResponse = {
      statusCode: 200,
      message: 'Login Successful',
      data: {
        user: {
          id: uuidv4(),
          email: 'test@example.com',
          name: 'Test User',
          password: expect.any(String),
          created_date: new Date(),
          updated_date: new Date(),
        },
        jwt: 'jwt_token',
      }
    };
    jest.spyOn(service, 'login').mockResolvedValue(mockResponse.data);

    const result = await controller.login(mockLoginDto);
    const transformedUser = await tranformedUser.transform(result.data.user);

    expect(result).toMatchObject({
      message: 'Login Successful',
      data: {
        user: transformedUser,
        jwt: expect.any(String),
      },
    });
    expect(service.login).toHaveBeenCalledWith(mockLoginDto);
  });

  it('should return error message if user already exists', async () => {
    const mockRegisterDto = {
      email: 'test@example.com',
      password: 'A!2b@3C#4d$',
      name: 'Test User',
    };

    const mockErrorResponse = {
      statusCode: 409,
      message: 'User Already Exists',
    };

    jest.spyOn(service, 'register').mockRejectedValue(mockErrorResponse);

    try {
      await controller.register(mockRegisterDto);
    } catch (error) {
      expect(error).toMatchObject(mockErrorResponse);
      expect((error as { statusCode: number; message: string }).statusCode).toEqual(409);
    }
  });

  it('should return error if password is incorrect', async () => {
    const mockLoginDto = {
      email: 'test@example.com',
      password: 'wrong_password',
    };

    const mockErrorResponse = {
      statusCode: 401,
      message: 'Invalid Password',
    };

    jest.spyOn(service, 'login').mockRejectedValue(mockErrorResponse);

    try {
      await controller.login(mockLoginDto);
    } catch (error) {
      expect(error).toEqual(mockErrorResponse);
      expect((error as { message: string; statusCode: number }).statusCode).toEqual(401);
    }
  });

});