import Category from '../models/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  getCategories(): Category[];
  findByName(name: string): Category;
  create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };
