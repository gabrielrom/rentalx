import { injectable, inject } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import AppError from '@shared/errors/AppError';

import { ICarsRepository } from '../../repositories/ICarsRepository';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    name,
    description,
    brand,
    license_plate,
    daily_rate,
    fine_amount,
    category_id,
  }: IRequest): Promise<Car> {
    const carLicensePlateAlreadyExits = await this.carsRepository.findByLicensePlate(
      license_plate,
    );

    if (carLicensePlateAlreadyExits) {
      throw new AppError('This car is alredy exits');
    }

    const car = await this.carsRepository.create({
      name,
      description,
      brand,
      license_plate,
      daily_rate,
      fine_amount,
      category_id,
    });

    return car;
  }
}

export { CreateCarUseCase };
