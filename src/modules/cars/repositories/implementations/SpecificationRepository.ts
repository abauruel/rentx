import { getRepository, Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }
  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      where: {
        name
      }
    })
    return specification
  }
  async list(): Promise<Specification[]> {
    return await this.repository.find()
  }

  async create(name: string, description: string): Promise<void> {
    const specification = this.repository.create({ name, description })
    await this.repository.save(specification)
  }

}

export { SpecificationRepository }