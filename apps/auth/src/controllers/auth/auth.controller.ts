import { Body, Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common';
import { AuthService } from '../../services';
import { AuthRequest, AuthResponse } from './auth.dto';
import { auth_schema } from '../../controllers'
import { InvalidSchema } from '../../exceptions'
import { AuthRequestSwagger, AuthResponseSwagger, InvalidSchemaSwagger } from './auth.swagger';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/auth')
@ApiTags('auth')
export class AuthController {
  logger: Logger;

  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthController.name)
  }

  @Post()
  @ApiBody({ type: AuthRequestSwagger })
  @ApiResponse({ status: 200, type: AuthResponseSwagger})
  @ApiResponse({ status: 400, type: InvalidSchemaSwagger})
  generateToken(@Body() data: AuthRequest, @Res() res?): AuthResponse {
    try {
      this.logger.log('POST /auth initialized')

      const validSchema = auth_schema.validate(data)

			if(validSchema.error) {
				this.logger.warn('Schema is not valid!')
				throw new InvalidSchema(validSchema.error)
			}

      const token = this.authService.generateToken(data)

      return res.status(HttpStatus.OK).json(token)
    } catch (error) {
      this.logger.error(`ERROR: ${error.code || error.message|| error.stack}`)
      const code = error.statusCode || 400
      return res.status(code).json(error)
    }
  }
}
