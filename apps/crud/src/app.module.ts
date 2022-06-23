import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CarsController } from './controllers/cars/cars.controller';
import { Cars } from './entities/cars.entity';
import { CarsRepository } from './repositories/cars.repository';
import { CarsService } from './services/cars.service';
import { JwtStrategy } from './shared/auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Cars],
      synchronize: process.env.POSTGRES_SYNC === "true",
    }),
    TypeOrmModule.forFeature([Cars])
  ],
  controllers: [CarsController],
  providers: [CarsService, JwtStrategy, CarsRepository],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
