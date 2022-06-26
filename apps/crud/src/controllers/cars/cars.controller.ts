import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ICarsController, CarsResponse, CarsRequest, cars_schema, cars_update_schema } from '@/crud/src/controllers';
import { InvalidSchema, IsNotUuidv4, CarNotFound } from '@/crud/src/exceptions';
import { CarsService } from '@/crud/src/services';
import { JwtAuthGuard } from '@/crud/src/shared/auth';
import { isValidUuidv4 } from '@/crud/src/shared/helpers';

@Controller('/cars')
export class CarsController implements ICarsController {

	logger: Logger;

	constructor(private readonly cars_service: CarsService) {
		this.logger = new Logger(CarsController.name);
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	async create(@Body() data: CarsRequest, @Res() res): Promise<CarsResponse> {
		try{
			this.logger.log('Schema validation initialized')
			const validSchema = cars_schema.validate(data)

			if(validSchema.error) {
				this.logger.warn('Schema is not valid!')
				throw new InvalidSchema(validSchema.error)
			}

			this.logger.log('Schema is valid.')

			const cars = await this.cars_service.create(data);
			return res.status(HttpStatus.CREATED).json(cars);
		}catch(err: any){
			this.logger.error(`ERROR: ${err.code || err.message|| err.stack}`)
			return res.status(HttpStatus.BAD_REQUEST).json(err);
		}
	}
	
	@Get(':id')
	@UseGuards(JwtAuthGuard)
	async getById(@Param('id') id: string, @Res() res): Promise<CarsResponse> {
		try {
			this.logger.log('GET /cars initialized')
			if(!isValidUuidv4(id)) {
				this.logger.warn('uuidv4 is not valid!')
				throw new IsNotUuidv4();
			}

			this.logger.log('CarService.get called')
			const car = await this.cars_service.get(id);

			if(!car) {
				this.logger.warn('Car not found!')
				throw new CarNotFound();
			}

			this.logger.log('Get car success')
			return res.status(HttpStatus.OK).json(car);
		} catch (err) {
			this.logger.error(`ERROR: ${err.code || err.message|| err.stack}`)
			return res.status(HttpStatus.BAD_REQUEST).json(err);
		}
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	async listAll(@Res() res): Promise<CarsResponse[]> {
		try{
			this.logger.log('GET all /cars initialized')

			this.logger.log('CarService.getAll called')
			const cars = await this.cars_service.getAll();

			if(!cars) {
				this.logger.warn('Cars not found!')
				throw new CarNotFound();
			}

			this.logger.log('Get car success')
			return res.status(HttpStatus.OK).json(cars);
		}catch(err){
			this.logger.error(`ERROR: ${err.code || err.message|| err.stack}`)
			return res.status(HttpStatus.BAD_REQUEST).json(err);
		}
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	async updateById(@Param('id') id: string, @Body() data: any, @Res() res): Promise<void> {
		try {
			this.logger.log('PUT /cars initialized')
			if(!isValidUuidv4(id)) {
				this.logger.warn('uuidv4 is not valid!')
				throw new IsNotUuidv4();
			}

			this.logger.log('Schema validation initialized')
			const validSchema = cars_update_schema.validate(data)

			if(validSchema.error) {
				this.logger.log('Schema is not valid')
				throw new InvalidSchema(validSchema.error)
			}

			this.logger.log('CarService.update called')
			const updated = await this.cars_service.update(id, data)

			if(!updated){
				this.logger.log('Car not found or not possible to update this data')
				throw new CarNotFound();
			}

			this.logger.log('Car has been updated!')
			return res.status(HttpStatus.OK).send()
		} catch (err) {
			this.logger.error(`ERROR: ${err.code || err.message|| err.stack}`)
			return res.status(HttpStatus.BAD_REQUEST).json(err);
		}
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async deleteById(@Param('id') id: string, @Res() res): Promise<void> {
		try {
			this.logger.log('DELETE /cars initialized')
			if(!isValidUuidv4(id)) {
				this.logger.warn('uuidv4 is not valid!')
				throw new IsNotUuidv4();
			}

			this.logger.log('CarService.delete called')
			const deleted = await this.cars_service.delete(id);

			if(!deleted){
				this.logger.log('Car not found or not possible to delete this data')
				throw new CarNotFound();
			}

			this.logger.log('Car has been deleted!')
			return res.status(HttpStatus.OK).send()
		} catch (err) {
			this.logger.error(`ERROR: ${err.code || err.message|| err.stack}`)
			return res.status(HttpStatus.BAD_REQUEST).json(err);
		}
	}
}
