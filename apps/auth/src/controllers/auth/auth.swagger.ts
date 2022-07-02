import { ApiProperty } from "@nestjs/swagger";

export class AuthRequestSwagger {
  @ApiProperty()
  client_id: string;

  @ApiProperty()
  client_secret: string;
}

export class AuthResponseSwagger {
  @ApiProperty()
  access_token: string;
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