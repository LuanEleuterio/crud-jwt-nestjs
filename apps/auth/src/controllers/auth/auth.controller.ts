import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthRequest, AuthResponse } from './auth.dto';
import { AuthService } from '../../services/auth.service';

@Controller('/auth')
export class AuthController {
  logger: Logger;

  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthController.name)
  }
  @Post()
  auth(@Body() req: AuthRequest): AuthResponse {
    this.logger.log('POST /auth initialized')
    return this.authService.genenateJWT(req)
  }
}
