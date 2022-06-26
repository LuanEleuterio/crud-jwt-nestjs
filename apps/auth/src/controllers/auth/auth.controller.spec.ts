import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from '../../auth.module';
import { AuthService } from '../../services/';

describe('AuthController', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    })
    .overrideProvider(AuthService)
    .useValue(AuthService)
    .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/POST auth generate token', () => {
    const payload = {
      client_id: 'test1234',
      client_secret: '1234test'
    }
    
    return request(app.getHttpServer())
      .post('/auth')
      .send(payload)
      .expect(200)
  });
});
