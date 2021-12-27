import { inject, injectable } from "tsyringe";
import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository) { }
  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list()
    console.log(categories)
    return categories
  }
}

export { ListCategoriesUseCase }