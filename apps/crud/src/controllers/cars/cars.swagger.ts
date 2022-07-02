import { ApiProperty } from "@nestjs/swagger";
import { CarsFuelType, CarsSize, CarsTransmission } from "crud/src/enum";

class Technical {
  @ApiProperty()
  weight: number

  @ApiProperty()
  height: number;

  @ApiProperty({ enum: CarsFuelType})
  size: string;
  
  @ApiProperty({ enum: CarsFuelType})
  fuel_type: string;
  
  @ApiProperty({ enum: CarsTransmission})
  transmission: string;
  
  @ApiProperty()
  horses: number;
}

export class CarsRequestDTO {
  @ApiProperty()
  make: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  year: number;

  @ApiProperty({type: () => Technical})
  technical: Technical;
}

export class CarsResponseDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  make: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  year: number;

  @ApiProperty({type: () => Technical})
  technical: Technical;
}

export class InvalidSchemaSwagger {
  @ApiProperty()
  message: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  statusCode: number

  @ApiProperty()
  details?: any;
}

export class GenericError {
  @ApiProperty()
  message: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  statusCode: number
}