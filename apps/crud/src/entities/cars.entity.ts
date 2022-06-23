import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity()
export class Cars {
  @PrimaryColumn()
  @Generated("uuid")
  id: string;

  @Column()
  name: string

  @Column()
  model: string

  @Column()
  horses: number
}