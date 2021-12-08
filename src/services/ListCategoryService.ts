import { Category } from "../entities/Category"
import { CategoriesRepository } from "../repositories/implementations/CategoriesRepository"

interface IRequest {
    name: string
}

class ListCategoryService {
    constructor(private categoryRepository: CategoriesRepository){}
    
    async execute(): Promise<Category[]>{

        const categoryAlreadyExist = await this.categoryRepository.list()
        return categoryAlreadyExist
    }
}

export { ListCategoryService}