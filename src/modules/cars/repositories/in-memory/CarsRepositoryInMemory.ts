import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    brand,
    category_id,
    license_plate,
    fine_amount,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      brand,
      category_id,
      license_plate,
      fine_amount,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find(car => car.license_plate === license_plate);

    return car;
  }

  async findAvailableCars(
    name?: string,
    brand?: string,
    category_id?: string,
  ): Promise<Car[]> {
    let cars = this.cars.filter(car => car.available === true);

    if (name) {
      cars = cars.filter(car => car.name === name);
    }

    if (brand) {
      cars = cars.filter(car => car.brand === brand);
    }

    if (category_id) {
      cars = cars.filter(car => car.category_id === category_id);
    }

    return cars;
  }
}

export { CarsRepositoryInMemory };
