import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import { CarsService } from '../../services';
import { CarsController } from '../../controllers';
import { Response } from 'express';
import { CarNotFound, InvalidSchema, IsNotUuidv4 } from '../../exceptions';
import { CrudModule } from '../../crud.module';
import { CarsFuelType, CarsSize, CarsTransmission } from '../../enum';
import { CarsRepository } from '../../repositories';

describe('CarsController', () => {
  let carsService: CarsService
  let carsController: CarsController
  let carsRepository: CarsRepository

  let responseObject = {}
  let errorObject = {}

  const response: Partial<Response> = {
    status: jest.fn().mockReturnValue({
      json: jest.fn().mockImplementation((JSONdata) => {
          responseObject = JSONdata;
      })
    })
  }

  const resWithSend: Partial<Response> = {
    status: jest.fn().mockReturnValue({
      json: jest.fn().mockImplementation((JSONdata) => {
        errorObject = JSONdata;
      }),
      send: jest.fn().mockImplementation()
    })
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CrudModule],
    }).compile()

    carsService = moduleRef.get<CarsService>(CarsService)
    carsController = moduleRef.get<CarsController>(CarsController)
    carsRepository = moduleRef.get<CarsRepository>(CarsRepository)
  });

  it('/POST crud create a car', async () => {
    const expectedResponse = {
      id: '62e1a4eb-d691-4396-ae59-1f5a6d96ff7e',
      make: "Tesla",
      model: "Model S",
      year: 2020,
      technical: {
        weight: 1345.77,
        height: 1.96,
        size: CarsSize.MIDSIZE,
        fuel_type: CarsFuelType.ENERGY,
        transmission: CarsTransmission.AUTOMATIC,
        horses: 30
      }
    };

    const request = {
      make: "Tesla",
      model: "Model S",
      year: 2020,
      technical: {
        weight: 1345.77,
        height: 1.96,
        size: CarsSize.MIDSIZE,
        fuel_type: CarsFuelType.ENERGY,
        transmission: CarsTransmission.AUTOMATIC,
        horses: 30
      }
    }

    const reposityMock =   {
      make: 'Tesla',
      model: 'Model S',
      year: 2020,
      technical_weight: 1345.77,
      technical_height: 1.96,
      technical_size: CarsSize.MIDSIZE,
      technical_fuel_type: CarsFuelType.ENERGY,
      technical_transmission: CarsTransmission.AUTOMATIC,
      technical_horses: 30,
      id: '62e1a4eb-d691-4396-ae59-1f5a6d96ff7e'
    }

    jest.spyOn(carsController, 'create')
    jest.spyOn(carsRepository, 'create').mockImplementation( async () => reposityMock)

    await carsController.create(request, response as Response)
    expect(responseObject).to.be.eql(expectedResponse)
  });

  it('/GET crud findOne a car', async () => {
    const expectedResponse = {
      id: '62e1a4eb-d691-4396-ae59-1f5a6d96ff7e',
      make: "Tesla",
      model: "Model S",
      year: 2020,
      technical: {
        weight: 1345.77,
        height: 1.96,
        size: CarsSize.MIDSIZE,
        fuel_type: CarsFuelType.ENERGY,
        transmission: CarsTransmission.AUTOMATIC,
        horses: 30
      }
    };

    const request = '62e1a4eb-d691-4396-ae59-1f5a6d96ff7e'

    const reposityMock =   {
      make: 'Tesla',
      model: 'Model S',
      year: 2020,
      technical_weight: 1345.77,
      technical_height: 1.96,
      technical_size: CarsSize.MIDSIZE,
      technical_fuel_type: CarsFuelType.ENERGY,
      technical_transmission: CarsTransmission.AUTOMATIC,
      technical_horses: 30,
      id: '62e1a4eb-d691-4396-ae59-1f5a6d96ff7e'
    }

    jest.spyOn(carsController, 'getById')
    jest.spyOn(carsRepository, 'findOne').mockImplementation( async () => reposityMock)

    await carsController.getById(request, response as Response)
    expect(responseObject).to.be.eql(expectedResponse)
  });

  it('/GET crud findAll cars', async () => {
    const expectedResponse = [
      {
        id: '62e1a4eb-d691-4396-ae59-1f5a6d96ff7e',
        make: "Tesla",
        model: "Model S",
        year: 2020,
        technical: {
          weight: 1345.77,
          height: 1.96,
          size: CarsSize.MIDSIZE,
          fuel_type: CarsFuelType.ENERGY,
          transmission: CarsTransmission.AUTOMATIC,
          horses: 30
        }
      },
      {
        id: '62e1a4eb-d691-4396-ae59-1f5a6d966666',
        make: "Tesla",
        model: "Model S",
        year: 2022,
        technical: {
          weight: 1345.77,
          height: 1.96,
          size: CarsSize.LARGE,
          fuel_type: CarsFuelType.GAS,
          transmission: CarsTransmission.MANUAL,
          horses: 30
        }
      }
    ];

    const reposityMock = [
      {
        make: 'Tesla',
        model: 'Model S',
        year: 2020,
        technical_weight: 1345.77,
        technical_height: 1.96,
        technical_size: CarsSize.MIDSIZE,
        technical_fuel_type: CarsFuelType.ENERGY,
        technical_transmission: CarsTransmission.AUTOMATIC,
        technical_horses: 30,
        id: '62e1a4eb-d691-4396-ae59-1f5a6d96ff7e'
      },
      {
        make: 'Tesla',
        model: 'Model S',
        year: 2022,
        technical_weight: 1345.77,
        technical_height: 1.96,
        technical_size: CarsSize.LARGE,
        technical_fuel_type: CarsFuelType.GAS,
        technical_transmission: CarsTransmission.MANUAL,
        technical_horses: 30,
        id: '62e1a4eb-d691-4396-ae59-1f5a6d966666'
      }
    ]

    jest.spyOn(carsController, 'listAll')
    jest.spyOn(carsRepository, 'findAll').mockImplementation( async () => reposityMock)

    await carsController.listAll(response as Response)
    expect(responseObject).to.be.eql(expectedResponse)
  });

  it('/DELETE crud delete a car', async () => {
    const request = '62e1a4eb-d691-4396-ae59-1f5a6d96ff7e'

    const reposityMock =   {
      affected: 1
    }

    jest.spyOn(carsController, 'deleteById')
    jest.spyOn(carsRepository, 'deleteById').mockImplementation( async () => reposityMock)

    const result = await carsController.deleteById(request, resWithSend as Response)
    
    expect(result).to.be.eql(undefined)
  });

  it('/POST crud throw SchemaInvalid when not send "make" field on create a car', async () => {

    const request = {
      model: "Model S",
      year: 2020,
      technical: {
        weight: 1345.77,
        height: 1.96,
        size: CarsSize.MIDSIZE,
        fuel_type: CarsFuelType.ENERGY,
        transmission: CarsTransmission.AUTOMATIC,
        horses: 30
      }
    }


    jest.spyOn(carsController, 'create')

    // @ts-ignore
    await carsController.create(request, response as Response)
    expect(responseObject).to.be.instanceOf(InvalidSchema)
  });

  it('/GET crud throw IsNotUuidv4 when id is not uuidv4 on findOne a car', async () => {

    const request = '62e1a4eb-d691-4396-ae59-1f5a6d96ffKK'

    jest.spyOn(carsController, 'getById')

    await carsController.getById(request, response as Response)
    expect(responseObject).to.be.instanceOf(IsNotUuidv4)
  });

  it('/GET crud throw CarNotFound when id sended on findOne not exist', async () => {

    const request = '62e1a4eb-d691-4396-ae59-1f5a6d96ffe9'

    jest.spyOn(carsController, 'getById')

    await carsController.getById(request, response as Response)
    expect(responseObject).to.be.instanceOf(CarNotFound)
  });

});
