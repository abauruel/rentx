type SpecificationDTO = {
  name: string,
  description: string
}
interface ISpecificationRepository {

  create(name: string, description: string): Promise<void>
  findByName(name: string): Promise<SpecificationDTO>
  list(): Promise<SpecificationDTO[]>
}

export { ISpecificationRepository }