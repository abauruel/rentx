import { inject, injectable } from "tsyringe";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository) {
  }
  async execute(name: string, description: string): Promise<void> {
    await this.specificationRepository.create(name, description)
  }
}

export { CreateSpecificationUseCase }