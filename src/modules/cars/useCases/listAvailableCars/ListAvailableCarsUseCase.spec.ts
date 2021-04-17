import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List all available cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi i3',
      description: 'Carro luxuoso',
      brand: 'Audi',
      license_plate: 'DTX-1209',
      daily_rate: 100.0,
      fine_amount: 20,
      category_id: '20392039203',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by the name', async () => {
    await carsRepositoryInMemory.create({
      name: 'Audi',
      description: 'Carro luxuoso',
      brand: 'Audi',
      license_plate: 'DTX-1209',
      daily_rate: 100.0,
      fine_amount: 20,
      category_id: '20392039203',
    });

    const car2 = await carsRepositoryInMemory.create({
      name: 'Range Rover Vogue',
      description: 'Carro luxuoso',
      brand: 'Range Rover',
      license_plate: 'DTX-20930',
      daily_rate: 200.0,
      fine_amount: 10,
      category_id: '20392039203',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: car2.name,
    });

    expect(cars).toEqual([car2]);
  });

  it('should be able to list all available cars by the brand', async () => {
    await carsRepositoryInMemory.create({
      name: 'Audi',
      description: 'Carro luxuoso',
      brand: 'Audi',
      license_plate: 'DTX-1209',
      daily_rate: 100.0,
      fine_amount: 20,
      category_id: '20392039203',
    });

    const car2 = await carsRepositoryInMemory.create({
      name: 'Range Rover Vogue',
      description: 'Carro luxuoso',
      brand: 'Range Rover',
      license_plate: 'DTX-20930',
      daily_rate: 200.0,
      fine_amount: 10,
      category_id: '20392039203',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: car2.brand,
    });

    expect(cars).toEqual([car2]);
  });

  it('should be able to list all available cars by the category_id', async () => {
    await carsRepositoryInMemory.create({
      name: 'Audi',
      description: 'Carro luxuoso',
      brand: 'Audi',
      license_plate: 'DTX-1209',
      daily_rate: 100.0,
      fine_amount: 20,
      category_id: '20392039203',
    });

    const car2 = await carsRepositoryInMemory.create({
      name: 'Range Rover Vogue',
      description: 'Carro luxuoso',
      brand: 'Range Rover',
      license_plate: 'DTX-20930',
      daily_rate: 200.0,
      fine_amount: 10,
      category_id: '20392033',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: car2.category_id,
    });

    expect(cars).toEqual([car2]);
  });
});
