import { Column, Entity, Generated, PrimaryColumn } from "typeorm";
import { CarsFuelType, CarsSize, CarsTransmission } from "../enum";

@Entity()
export class Cars {
  @PrimaryColumn()
  @Generated("uuid")
  id: string;

  @Column({ length: 50})
  make: string;

  @Column({ length: 50 })
  model: string;

  @Column('integer')
  year: number;

  @Column('double precision')
  technical_weight: number;

  @Column('double precision')
  technical_height: number;

  @Column({
    type: "enum",
    enum: CarsSize
  })
  technical_size: CarsSize;

  @Column({
    type: "enum",
    enum: CarsFuelType
  })
  technical_fuel_type: CarsFuelType;

  @Column({
    type: "enum",
    enum: CarsTransmission
  })
  technical_transmission: CarsTransmission;

  @Column('integer')
  technical_horses: number;
}