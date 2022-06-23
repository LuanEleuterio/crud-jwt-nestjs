import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AppService } from '../../services/app.service';
import { JwtAuthGuard } from '../../shared/auth/jwt-auth.guard';
import { ICarsController } from './cars.interface';

@Controller('/cars')
export class CarsController implements ICarsController {
	constructor(private readonly appService: AppService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(data: any): Promise<void> {
		throw new Error('Method not implemented.');
	}
	
	@Get('/{id}')
	@UseGuards(JwtAuthGuard)
	async getById(): Promise<string> {
		return ''
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	listAll(): Promise<any[]> {
		throw new Error('Method not implemented.');
	}

	@Put('/{id}')
	@UseGuards(JwtAuthGuard)
	updateById(id: string, data: any): Promise<void> {
		throw new Error('Method not implemented.');
	}

	@Delete('/{id}')
	@UseGuards(JwtAuthGuard)
	deleteById(id: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
