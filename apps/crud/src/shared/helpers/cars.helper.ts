import { CarsRequest } from "../../controllers/cars/cars.dto";
import { Cars } from "../../entities/cars.entity";

export function build_cars_db(cars: CarsRequest): any {
  return {
    make: cars?.make,
    model: cars?.model,
    year: cars?.year,
    technical_weight: cars?.technical?.weight,
    technical_height: cars?.technical?.height,
    technical_size: cars?.technical?.size,
    technical_fuel_type: cars?.technical?.fuel_type,
    technical_transmission: cars?.technical?.transmission,
    technical_horses: cars?.technical?.horses
  }
}

export function build_cars_response(cars: Cars): any {
  return {
    id: cars.id,
    make: cars.make,
    model: cars.model,
    year: cars.year,
    technical: {
      weight: cars.technical_weight,
      height: cars.technical_height,
      size: cars.technical_size,
      fuel_type: cars.technical_fuel_type,
      transmission: cars.technical_transmission,
      horses: cars.technical_horses
    }
  }
}

export function build_list_cars_response(cars: Cars[]): any {
  return cars.map(car => {
    return { 
      id: car.id,
      make: car.make,
      model: car.model,
      year: car.year,
      technical: {
        weight: car.technical_weight,
        height: car.technical_height,
        size: car.technical_size,
        fuel_type: car.technical_fuel_type,
        transmission: car.technical_transmission,
        horses: car.technical_horses
      }
    }
  })
}

export function isValidUuidv4(uuid: string): boolean {
  const rgx = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  return rgx.test(uuid)
}