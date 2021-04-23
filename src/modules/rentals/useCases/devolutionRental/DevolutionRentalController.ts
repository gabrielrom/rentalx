import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { id: rental_id } = request.params;

    const devolutionREntalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionREntalUseCase.execute({
      rental_id,
      user_id: id,
    });

    return response.json(rental);
  }
}
export { DevolutionRentalController };
