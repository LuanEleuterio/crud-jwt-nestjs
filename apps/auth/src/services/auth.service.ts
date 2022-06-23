import { Injectable } from '@nestjs/common';
import { AuthRequest, AuthResponse } from '../controllers/auth/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService
  ){}

  genenateJWT(payload: AuthRequest): AuthResponse {
    const access_token = this.jwtService.sign(payload)
    return {
      access_token
    }
  }
}
