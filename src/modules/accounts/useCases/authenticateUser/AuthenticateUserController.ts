import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserUseCase from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserUseCase);

    const tokenInfo = await authenticateUser.execute({
      email,
      password,
    });

    return response.json(tokenInfo);
  }
}

export default AuthenticateUserController;
