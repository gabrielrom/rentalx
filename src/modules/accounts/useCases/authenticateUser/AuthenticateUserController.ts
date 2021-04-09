import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserUseCase from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const authenticateUser = container.resolve(AuthenticateUserUseCase);

      const tokenInfo = await authenticateUser.execute({
        email,
        password,
      });

      return response.json(tokenInfo);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default AuthenticateUserController;
