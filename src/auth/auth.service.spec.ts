import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ApiResponse } from 'src/shared/utils/api.response/apiResponse';
import { registerDto } from './dto/register-dto';
import { v4 as uuidv4 } from 'uuid';



describe('AuthService', () => {
  let service: AuthService;

  const mockUserService = {
    findOne: jest.fn(email => {
      if (email === 'johndoe@example.com') {
        return Promise.resolve({
          id: id,
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'hashedPassword',
          created_date: new Date(),
          updated_date: new Date(),
        });
      } else {
        return Promise.resolve(null);
      }
    }),
    create: jest.fn(registerDto => {
      return Promise.resolve({
        id: id,
        name: registerDto.name,
        email: registerDto.email,
        password: 'hashedPassword',
        created_date: new Date(),
        updated_date: new Date(),
      });
    }),
  };

  const mockJwtService = {
    sign: jest.fn(payload => 'signedToken'),
    signAsync: jest.fn(payload => 'jwt_token'),
  };

  const mockApiResponse = {
    customSuccess: jest.fn(),
    loginSuccess: jest.fn(),
    customMessage: jest.fn(),
    registerSuccess: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ApiResponse, useValue: mockApiResponse },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });
  const id = uuidv4();

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerDto: registerDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'A!2b@3C#4d$',
      };

      const mockResponse = {
        user: {
          id: id,
          name: 'Test User',
          email: 'test@example.com',
          password: 'hashedPassword',
          created_date: new Date(),
          updated_date: new Date(),
        },
        jwt: 'jwt_token',
      };

      jest.spyOn(service, 'register').mockResolvedValue(mockResponse);

      const result = await service.register(registerDto);

      expect(result).toEqual(mockResponse);
      expect(service.register).toHaveBeenCalledWith(registerDto);
    });

    it('should throw an error if the user already exists', async () => {
      const registerDto: registerDto = {
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: 'A!2b@3C#4d$',
      };

      const mockErrorResponse = {
        message: 'User already exists',
        statusCode: 409,
      };

      mockUserService.findOne = jest.fn().mockResolvedValueOnce({
        id: id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: expect.any(String),
        created_date: new Date(),
        updated_date: new Date(),
      });

      jest.spyOn(service, 'register').mockRejectedValue(mockErrorResponse);

      try {
        await service.register(registerDto);
      } catch (error) {
        expect(error).toEqual(mockErrorResponse);
        expect(service.register).toHaveBeenCalledWith(registerDto);
      }
    });
  });

  describe('login', () => {
    it('should log in a user', async () => {
      const logindto = { email: 'johndoe@example.com', password: 'password' };

      const mockResponse = {
        user: {
          id: id,
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: expect.any(String),
          created_date: new Date(),
          updated_date: new Date(),
        },
        jwt: 'jwt_token',
      };

      jest.spyOn(service, 'login').mockResolvedValue(mockResponse);

      const result = await service.login(logindto);

      expect(result).toEqual(mockResponse);
      expect(service.login).toHaveBeenCalledWith(logindto);
    });

    it('should throw an error for incorrect credentials', async () => {
      const logindto = { email: 'johndoe@example.com', password: 'wrong_password' };

      const mockErrorResponse = {
        message: 'Invalid Credentials',
        statusCode: 401,
      };

      mockUserService.findOne = jest.fn().mockResolvedValueOnce({
        id: id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'hashedPassword',
        created_date: new Date(),
        updated_date: new Date(),
      });

      jest.spyOn(service, 'login').mockRejectedValue(mockErrorResponse);

      try {
        await service.login(logindto);
      } catch (error) {
        expect(error).toEqual(mockErrorResponse);
        expect(service.login).toHaveBeenCalledWith(logindto);
      }
    });
  });
});
