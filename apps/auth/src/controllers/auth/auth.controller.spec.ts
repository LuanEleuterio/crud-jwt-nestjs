import { Test } from '@nestjs/testing';
import { AuthModule } from '../../auth.module';
import { AuthService } from '../../services';
import { expect } from 'chai';
import { Response } from 'express';

describe('AuthController', () => {
  let authService: AuthService

  let responseObject = {
    status: 200,
    message: 'Hello World!'
  };

  const response: Partial<Response> = {
    status: jest.fn().mockImplementation().mockReturnValue(200),
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile()

    authService = moduleRef.get<AuthService>(AuthService)
  });

  it('/POST auth generate token', () => {
    const payload = {
      client_id: 'test1234',
      client_secret: '1234test'
    }
    
    jest.spyOn(authService, 'generateToken')

    const result = authService.generateToken(payload)

    expect(result).not.null
  });
});
