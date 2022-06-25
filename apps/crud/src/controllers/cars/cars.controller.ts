import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { InvalidSchema, IsNotUuidv4, CarNotFound } from '../../exceptions';
import { CarsService } from '../../services/cars.service';
import { JwtAuthGuard } from '../../shared/auth/jwt-auth.guard';
import { isValidUuidv4 } from '../../shared/helpers/cars.helper';
import { CarsRequest, CarsResponse } from './cars.dto';
import { ICarsController } from './cars.interface';
import { cars_schema, cars_update_schema } from './cars.schema';

@Controller('/cars')
export class CarsController implements ICarsController {
	constructor(private readonly cars_service: CarsService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	async create(@Body() data: CarsRequest, @Res() res): Promise<CarsResponse> {
		try{
			const validSchema = cars_schema.validate(data)

			if(validSchema.error) {
				throw new InvalidSchema(validSchema.error)
			}

			const cars = await this.cars_service.create(data);
			return res.status(HttpStatus.CREATED).json(cars);
		}catch(err: any){
			return res.status(HttpStatus.BAD_REQUEST).json(err);
		}
	}
	
	@Get(':id')
	@UseGuards(JwtAuthGuard)
	async getById(@Param('id') id: string, @Res() res): Promise<CarsResponse> {
		try {
			if(!isValidUuidv4(id)) {
				throw new IsNotUuidv4();
			}

			const car = await this.cars_service.get(id);

			if(!car) {
				throw new CarNotFound();
			}

			return res.status(HttpStatus.OK).json(car);
		} catch (err) {
			return res.status(HttpStatus.BAD_REQUEST).json(err);
		}
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	async listAll(@Res() res): Promise<CarsResponse[]> {
		try{
			const cars = await this.cars_service.getAll();

			if(!cars) {
				throw new CarNotFound();
			}

			return res.status(HttpStatus.OK).json(cars);
		}catch(err){
			return res.status(HttpStatus.BAD_REQUEST).json(err);
		}
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	async updateById(@Param('id') id: string, @Body() data: any, @Res() res): Promise<void> {
		try {
			if(!isValidUuidv4(id)) {
				throw new IsNotUuidv4();
			}

			const validSchema = cars_update_schema.validate(data)

			if(validSchema.error) {
				throw new InvalidSchema(validSchema.error)
			}

			const updated = await this.cars_service.update(id, data)

			if(!updated){
				throw new CarNotFound();
			}

			return res.status(HttpStatus.OK).send()
		} catch (err) {
			return res.status(HttpStatus.BAD_REQUEST).json(err);
		}
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async deleteById(@Param('id') id: string, @Res() res): Promise<void> {
		try {
			if(!isValidUuidv4(id)) {
				throw new IsNotUuidv4();
			}

			const deleted = await this.cars_service.delete(id);

			if(!deleted){
				throw new CarNotFound();
			}
			
			return res.status(HttpStatus.OK).send()
		} catch (err) {
			return res.status(HttpStatus.BAD_REQUEST).json(err);
		}
	}
}
