import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ICarsController, CarsResponse, CarsRequest, cars_schema, cars_update_schema } from '../../controllers';
import { InvalidSchema, IsNotUuidv4 } from '../../exceptions';
import { CarsService } from '../../services';
import { JwtAuthGuard } from '../../shared/auth';
import { isValidUuidv4 } from '../../shared/helpers';
import { CarsRequestDTO, CarsResponseDTO, GenericError, InvalidSchemaSwagger } from './cars.swagger';

@Controller('/cars')
@ApiTags('cars')
@ApiBearerAuth()
export class CarsController implements ICarsController {

	logger: Logger;

	constructor(private readonly cars_service: CarsService) {
		this.logger = new Logger(CarsController.name);
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiBody({ type: CarsRequestDTO })
	@ApiResponse({ status: 201, type: CarsResponseDTO})
	@ApiResponse({ status: 400, type: InvalidSchemaSwagger})
	@ApiResponse({ status: 400, description: 'BAD_REQUEST'})
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
	@ApiResponse({ status: 200, type: CarsResponseDTO })
	@ApiResponse({ status: 400, type: GenericError, description: 'The id sended is not an uuidv4' })
	@ApiResponse({ status: 404, type: GenericError, description: 'Car not found' })
	async getById(@Param('id') id: string, @Res() res): Promise<CarsResponse> {
		try {
			this.logger.log('GET /cars initialized')
			if(!isValidUuidv4(id)) {
				this.logger.warn('uuidv4 is not valid!')
				throw new IsNotUuidv4();
			}

			this.logger.log('CarService.get called')
			const car = await this.cars_service.get(id);

			this.logger.log('Get car success')
			return res.status(HttpStatus.OK).json(car);
		} catch (err) {
			this.logger.error(`ERROR: ${err.code || err.message|| err.stack}`)
			const code = err.statusCode || 400
      return res.status(code).json(err)
		}
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiResponse({ status: 200, type: [CarsResponseDTO] })
	@ApiResponse({ status: 404, type: GenericError, description: 'Car not found' })
	async listAll(@Res() res): Promise<CarsResponse[]> {
		try{
			this.logger.log('GET all /cars initialized')

			this.logger.log('CarService.getAll called')
			const cars = await this.cars_service.getAll();

			this.logger.log('Get car success')
			return res.status(HttpStatus.OK).json(cars);
		}catch(err){
			this.logger.error(`ERROR: ${err.code || err.message|| err.stack}`)
			const code = err.statusCode || 400
      return res.status(code).json(err)
		}
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	@ApiParam({name: 'id', description: 'The id cars'})
	@ApiBody({ type: CarsRequestDTO })
	@ApiResponse({ status: 200, description: 'Car updated!' })
	@ApiResponse({ status: 400, type: InvalidSchemaSwagger})
	@ApiResponse({ status: 400, type: GenericError, description: 'The id sended is not an uuidv4' })
	@ApiResponse({ status: 404, type: GenericError, description: 'Car not found' })
	async updateById(@Param('id') id: string, @Body() data: any, @Res() res): Promise<void> {
		try {

			if(!Object.keys(data).length){
				this.logger.warn('PUT /cars Body is empty	')
				throw new InvalidSchema()
			}

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
			await this.cars_service.update(id, data)

			this.logger.log('Car has been updated!')
			return res.status(HttpStatus.OK).send()
		} catch (err) {
			this.logger.error(`ERROR: ${err.code || err.message|| err.stack}`)
			const code = err.statusCode || 400
      return res.status(code).json(err)
		}
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	@ApiParam({name: 'id', description: 'The id cars'})
	@ApiResponse({ status: 200, description: 'Car deleted!'})
	@ApiResponse({ status: 400, type: GenericError, description: 'The id sended is not an uuidv4' })
	@ApiResponse({ status: 404, type: GenericError, description: 'Car not found' })
	async deleteById(@Param('id') id: string, @Res() res): Promise<void> {
		try {
			this.logger.log('DELETE /cars initialized')
			if(!isValidUuidv4(id)) {
				this.logger.warn('uuidv4 is not valid!')
				throw new IsNotUuidv4();
			}

			this.logger.log('CarService.delete called')
			await this.cars_service.delete(id);

			this.logger.log('Car has been deleted!')
			return res.status(HttpStatus.OK).send()
		} catch (err) {
			this.logger.error(`ERROR: ${err.code || err.message|| err.stack}`)
			const code = err.statusCode || 400
      return res.status(code).json(err)
		}
	}
}
