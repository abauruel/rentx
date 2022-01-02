import { inject, injectable } from "tsyringe"
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import fs from 'fs'
import csvParse from 'csv-parser'

interface IImportCategory {
  name: string;
  description: string
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoriesRepository) { }

  async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const categories: IImportCategory[] = []

      const parseFile = csvParse()
      stream.pipe(parseFile)
      parseFile.
        on("data", async (line) => {
          const { name, description } = line
          categories.push({ name, description })
        })
        .on("end", () => {
          fs.promises.unlink(file.path)
          resolve(categories)
        })
    })
  }

  async execute(file: Express.Multer.File): Promise<IImportCategory[]> {

    const categories = await this.loadCategories(file)
    for (let category of categories) {
      const { name, description } = category
      const categoryName = await this.categoryRepository.findByName(name)
      if (!categoryName) {
        await this.categoryRepository.create({ name, description })
      }
    }
    return categories
  }
}

export { ImportCategoryUseCase }