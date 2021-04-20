import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 140,
      license_plate: '01111',
      fine_amount: 5,
      brand: 'Car brand',
      category_id: '193012930',
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'test',
      description: 'test',
    });

    const carSpecifications = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    expect(carSpecifications).toHaveProperty('specifications');
    expect(carSpecifications.specifications).toEqual([specification]);
  });

  it('should not be able to add a new specification to a non-existent car', async () => {
    await carsRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 140,
      license_plate: '01111',
      fine_amount: 5,
      brand: 'Car brand',
      category_id: '193012930',
    });

    const specifications = ['5678'];

    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id: 'non-existent car',
        specifications_id: specifications,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
