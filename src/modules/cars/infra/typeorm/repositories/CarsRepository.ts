import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    id,
    name,
    description,
    brand,
    license_plate,
    fine_amount,
    daily_rate,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      id,
      name,
      description,
      brand,
      license_plate,
      fine_amount,
      daily_rate,
      category_id,
      specifications,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      license_plate,
    });

    return car;
  }

  async findAvailableCars(
    name?: string,
    brand?: string,
    category_id?: string,
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('car')
      .where('available = :available', { available: true });

    if (name) {
      carsQuery.andWhere('name = :name', { name });
    }

    if (brand) {
      carsQuery.andWhere('brand = :brand', { brand });
    }

    if (category_id) {
      carsQuery.andWhere('category_id = :category_id', { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);

    return car;
  }

  async updateAvailable(car_id: string, available: boolean): Promise<void> {
    // Update set available = 'true' where id = car_id
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :car_id')
      .setParameters({ car_id })
      .execute();
  }
}

export { CarsRepository };
