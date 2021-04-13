import AppError from '../../../../errors/AppError';
import CategoriesRepositoryInMemory from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import CreateCategoryUseCase from './CreateCategoryUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create a new category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to create a new category', async () => {
    await createCategoryUseCase.execute({
      name: 'Category Test',
      description: 'Category description test',
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      'Category Test',
    );

    expect(categoryCreated).toHaveProperty('id');
    expect(categoryCreated.name).toBe('Category Test');
  });

  it('should not be able to create a new category with name already exits', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description Test',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    expect(async () => {
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
