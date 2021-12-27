import { Router } from "express";
import multer from 'multer'
import { CreateCategoryController } from '../modules/cars/useCases/CreateCategory/CreateCategoryController'
import { ListCategoryController } from "../modules/cars/useCases/listCategories/ListCategoryController";
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController'

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController()
const listCategoryController = new ListCategoryController()
const importCategoryController = new ImportCategoryController()

const upload = multer({
  dest: './tmp'
})
categoriesRoutes.post("/", createCategoryController.handle)
categoriesRoutes.get('/', listCategoryController.handle)

categoriesRoutes.post('/import', upload.single("file"), importCategoryController.handle)

// categoriesRoutes.get("/", (request, response) => {
//   const listCategoryService = new ListCategoryService(categoriesRepository);
//   const categories = listCategoryService.execute();

//   return response.json(categories);
// });

export { categoriesRoutes };
