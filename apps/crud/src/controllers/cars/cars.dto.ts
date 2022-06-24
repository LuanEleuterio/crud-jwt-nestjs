import { CarsFuelType, CarsSize, CarsTransmission } from "../../enum"

export type CarsRequest = {
  make: string,
  model: string,
  year: number,
  technical: {
    weight: number
    height: number,
    size: CarsSize,
    fuel_type: CarsFuelType,
    transmission: CarsTransmission,
    horses: number
  }
}

export type CarsResponse = {
  id: string
  make: string,
  model: string,
  year: number,
  technical: {
    weight: number
    height: number,
    size: CarsSize,
    fuel_type: CarsFuelType,
    transmission: CarsTransmission,
    horses: number
  }
}