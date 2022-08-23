import { Router } from "express"
import { authenticateRouter } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { rentalRoutes } from "./rental.routes";
import { specificationsRouter } from "./specifications.routes";
import { usersRouter } from "./users.routes";

const router = Router()

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRouter)
router.use('/users', usersRouter)
router.use('/cars', carsRoutes)
router.use('/rentals', rentalRoutes)
router.use(authenticateRouter)

export { router }