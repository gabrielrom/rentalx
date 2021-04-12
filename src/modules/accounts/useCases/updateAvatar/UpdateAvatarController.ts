import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateAvatarUseCase from './UpdateAvatarUseCase';

class UpdateAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const avatar_file = request.file.filename;

    const updateAvatar = container.resolve(UpdateAvatarUseCase);

    await updateAvatar.execute({
      user_id: id,
      avatar_file,
    });

    return response.status(204).send();
  }
}

export default UpdateAvatarController;
