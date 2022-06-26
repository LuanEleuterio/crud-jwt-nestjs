import { Injectable, Logger } from '@nestjs/common';
import { AuthRequest, AuthResponse } from '@/auth/src/controllers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  logger: Logger;

  constructor(
    private jwtService: JwtService
  ){
    this.logger = new Logger(AuthService.name)
  }

  genenateJWT(payload: AuthRequest): AuthResponse {
    this.logger.log('JWT generated!')
    const access_token = this.jwtService.sign(payload)
    return {
      access_token
    }
  }
}
