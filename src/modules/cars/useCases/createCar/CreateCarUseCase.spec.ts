import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create a new car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 140,
      license_plate: '01111',
      fine_amount: 5,
      brand: 'Car brand',
      category_id: '193012930',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car with license plate alredy registered', async () => {
    const car = {
      name: 'Car name',
      description: 'Car description',
      daily_rate: 140,
      license_plate: '01111',
      fine_amount: 5,
      brand: 'Car brand',
      category_id: '193012930',
    };

    await createCarUseCase.execute(car);

    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car name 2',
        description: 'Car description 2',
        daily_rate: 150,
        license_plate: car.license_plate,
        fine_amount: 2,
        brand: 'Car brand 2',
        category_id: '92039109',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new car with available true', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 140,
      license_plate: '01111',
      fine_amount: 5,
      brand: 'Car brand',
      category_id: '193012930',
    });

    expect(car.available).toBe(true);
  });
});
