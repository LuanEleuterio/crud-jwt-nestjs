import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRequest, AuthResponse } from '../controllers';

@Injectable()
export class AuthService {
  logger: Logger;

  constructor(
    private jwtService: JwtService
  ){
    this.logger = new Logger(AuthService.name)
  }

  generateToken(payload: AuthRequest): AuthResponse {
    this.logger.log('Access Token generated!')
    const access_token = this.jwtService.sign(payload)
    return {
      access_token
    }
  }
}
