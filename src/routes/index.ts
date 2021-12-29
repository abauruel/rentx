import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { userRouters } from "./users.routes";
import { specificationRoutes } from "./specifications.routes";
import { authenticateRoutes } from "./authenticate.routes";
const routes = Router();

routes.use("/categories", categoriesRoutes);
routes.use("/users", userRouters);
routes.use("/specifications", specificationRoutes)
routes.use(authenticateRoutes)

export { routes };
