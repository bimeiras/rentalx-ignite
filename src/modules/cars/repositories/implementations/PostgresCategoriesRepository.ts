//Apenas simulando como funcionaria a substituição do banco de dados a partir de uma interface estabelecida

import { ICategoryRepository, ICreateCategoryDTO } from "../ICategoryRepository";
import { Category } from "../../models/Category"

class PostgressCategoriesRepository implements ICategoryRepository{
    findByName(name: string): Category {
        console.log(name)
        return null
    }
    list(): Category[] {
        return null
    }

    create({name, description}: ICreateCategoryDTO): void {
        console.log(name, description)
        return null
    }
}

export { PostgressCategoriesRepository }