import { Body, Controller, Post } from '@nestjs/common';
import { AuthRequest, AuthResponse } from './auth.dto';
import { AuthService } from '../../services/auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  auth(@Body() req: AuthRequest): AuthResponse {
    return this.authService.genenateJWT(req)
  }
}
