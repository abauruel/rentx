import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { userRouters } from "./users.routes";
import { specificationRoutes } from "./specifications.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
const routes = Router();

routes.use(authenticateRoutes)
routes.use(ensureAuthenticated)
routes.use("/categories", categoriesRoutes);
routes.use("/users", userRouters);
routes.use("/specifications", specificationRoutes)

export { routes };
