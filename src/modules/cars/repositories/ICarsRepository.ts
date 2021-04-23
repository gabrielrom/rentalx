import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICreateCarDTO } from '../dtos/ICreateCarDTO';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailableCars(
    name?: string,
    brand?: string,
    category_id?: string,
  ): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  updateAvailable(car_id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
