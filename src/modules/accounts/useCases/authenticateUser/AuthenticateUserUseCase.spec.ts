import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO';
import UsersRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import CreateUserUseCase from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import AppError from '@shared/errors/AppError';

import AuthenticateUserUseCase from './AuthenticateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUser: AuthenticateUserUseCase;
let createUser: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUser = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUser = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate a user', async () => {
    const user: ICreateUserDTO = {
      name: 'Jhon Doe',
      email: 'jhon@gmail.com',
      password: '1234',
      driver_license: '12345',
    };

    await createUser.execute(user);

    const authenticateResponse = await authenticateUser.execute({
      email: user.email,
      password: user.password,
    });

    expect(authenticateResponse).toHaveProperty('token');
  });

  it('should not be able to authenticate a non-existent user', () => {
    expect(async () => {
      await authenticateUser.execute({
        email: 'john@gmail.com',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with wrong password', async () => {
    const user: ICreateUserDTO = {
      name: 'Jhon Doe',
      email: 'jhon@gmail.com',
      password: '1234',
      driver_license: '12345',
    };

    await createUser.execute(user);

    expect(async () => {
      await authenticateUser.execute({
        email: user.email,
        password: 'wrong password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
