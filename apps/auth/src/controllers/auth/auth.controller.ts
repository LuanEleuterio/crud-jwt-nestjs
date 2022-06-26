import { Body, Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common';
import { AuthService } from '../../services';
import { AuthRequest, AuthResponse } from './auth.dto';
import { auth_schema } from '../../controllers'
import { InvalidSchema } from '../../exceptions'

@Controller('/auth')
export class AuthController {
  logger: Logger;

  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthController.name)
  }
  @Post()
  generateToken(@Body() req: AuthRequest, @Res() res?): AuthResponse {
    try {
      this.logger.log('POST /auth initialized')

      const validSchema = auth_schema.validate(req)

			if(validSchema.error) {
				this.logger.warn('Schema is not valid!')
				throw new InvalidSchema(validSchema.error)
			}

      const token = this.authService.generateToken(req)

      return res.status(HttpStatus.OK).json(token)
    } catch (error) {
      this.logger.error(`ERROR: ${error.code || error.message|| error.stack}`)
      const code = error.statusCode || 400
      return res.status(code).json(error)
    }
  }
}
