import { Router } from 'express';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';

import multer from 'multer';

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp"
})

const createCategoryController = new CreateCategoryController()
const importCategory = new ImportCategoryController()
const listCategories = new ListCategoriesController()

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.get('/', listCategories.handle)

categoriesRoutes.post('/import', upload.single('file'), importCategory.handle)

export {categoriesRoutes}