import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CarsService } from '../../services/cars.service';
import { JwtAuthGuard } from '../../shared/auth/jwt-auth.guard';
import { ICarsController } from './cars.interface';

@Controller('/cars')
export class CarsController implements ICarsController {
	constructor(private readonly cars_service: CarsService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	async create(@Body() data: any): Promise<void> {

		const cars = await this.cars_service.create(data);
		return cars
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
