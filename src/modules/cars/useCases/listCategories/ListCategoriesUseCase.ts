import Category from '../../models/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    return this.categoriesRepository.getCategories();
  }
}

export default ListCategoriesUseCase;
