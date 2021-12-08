import { Router } from "express";
import { CreateCategoryController} from '../modules/cars/useCases/CreateCategory/CreateCategoryController'

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController()

categoriesRoutes.post("/", createCategoryController.handle)

// categoriesRoutes.get("/", (request, response) => {
//   const listCategoryService = new ListCategoryService(categoriesRepository);
//   const categories = listCategoryService.execute();

//   return response.json(categories);
// });

export { categoriesRoutes };
