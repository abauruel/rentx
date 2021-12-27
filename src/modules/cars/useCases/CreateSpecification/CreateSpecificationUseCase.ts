import { inject, injectable } from "tsyringe";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

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