import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import { AuthModule } from '../../auth.module';
import { AuthService } from '../../services';
import { AuthController } from '../../controllers';
import { Response } from 'express';
import { InvalidSchema } from '../../exceptions';

describe('AuthController', () => {
  let authService: AuthService
  let authController: AuthController

  let responseObject = {}

  const response: Partial<Response> = {
    statusCode: 0,
    status: jest.fn().mockReturnValue({
      json: jest.fn().mockImplementation((JSONdata) => {
          responseObject = JSONdata;
      })
    })
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile()

    authService = moduleRef.get<AuthService>(AuthService)
    authController = moduleRef.get<AuthController>(AuthController)
  });

  it('/POST auth generate token', () => {
    const request = {
      client_id: 'test1234',
      client_secret: '1234test'
    }

    jest.spyOn(authController, 'generateToken')

    authController.generateToken(request, response as Response)
    expect(responseObject).not.null
  });

  it('/POST auth throw Invalid Schem when client_id not send', () => {
    const request = {
      client_secret: '1234test'
    }

    jest.spyOn(authController, 'generateToken')

    // @ts-ignore
    authController.generateToken(request, response as Response)

    expect(responseObject).to.be.instanceOf(InvalidSchema);
  });
});
