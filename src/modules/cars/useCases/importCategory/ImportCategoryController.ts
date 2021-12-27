import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
  async handle(request: Request, response: Response) {
    const file = request.file as Express.Multer.File
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase)

    await importCategoryUseCase.execute(file);

    return response.status(200).send()
  }
}

export { ImportCategoryController }