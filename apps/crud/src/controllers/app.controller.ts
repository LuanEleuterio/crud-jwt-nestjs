import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { JwtAuthGuard } from '../shared/auth/jwt-auth.guard';

@Controller('/test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
