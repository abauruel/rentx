import 'reflect-metadata'
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { inject, injectable } from 'tsyringe'

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoriesRepository) { }
  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExist = await this.categoryRepository.findByName(name);

    if (categoryAlreadyExist) {
      throw new Error("Category already exists!");
    }

    await this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
