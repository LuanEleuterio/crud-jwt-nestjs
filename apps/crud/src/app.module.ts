import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CarsController } from '@/crud/src/controllers';
import { Cars } from '@/crud/src/entities';
import { CarsRepository } from '@/crud/src/repositories';
import { CarsService } from '@/crud/src/services';
import { JwtStrategy } from '@/crud/src/shared/auth';

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
