import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import AppError from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create a new rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it('shoud be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: 'user_id',
      car_id: 'car_id',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '123',
      car_id: 'car_id',
      expected_return_date: dayAdd24Hours,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '321',
        car_id: rental.car_id,
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '123',
      car_id: 'car_id',
      expected_return_date: dayAdd24Hours,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: rental.user_id,
        car_id: '1239',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if return date is less than 24 hours', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '1234',
        car_id: '1239',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
