import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoryRepository, ICreateCategoryDTO } from "../ICategoryRepository";


class CategoriesRepositoryInMemory implements ICategoryRepository {
    categories: Category[] = []
    
    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(category => category.name === name)

        return category
    }
    async list(): Promise<Category[]> {
        const all = this.categories

        return all
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const categories = new Category()

        Object.assign(categories, {
            name, 
            description
        })

        this.categories.push(categories)
    }
    
}

export { CategoriesRepositoryInMemory }