import { Body, Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common';
import { AuthService } from '../../services';
import { AuthRequest, AuthResponse } from './auth.dto';

@Controller('/auth')
export class AuthController {
  logger: Logger;

  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthController.name)
  }
  @Post()
  generateToken(@Body() req: AuthRequest, @Res() res): AuthResponse {
    try {
      this.logger.log('POST /auth initialized')
      const token = this.authService.genenateToken(req)
      return res.status(HttpStatus.OK).json(token)
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error)
    }
  }
}
