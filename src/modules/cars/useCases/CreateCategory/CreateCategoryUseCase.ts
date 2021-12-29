import 'reflect-metadata'
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../errors/AppError';

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
      throw new AppError("Category already exists!");
    }

    await this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
