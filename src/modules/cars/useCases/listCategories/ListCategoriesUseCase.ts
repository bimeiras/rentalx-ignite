import { Category } from "../../entities/Category";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

class ListCategoriesUseCase { 
    constructor(private createCategoryRepository: ICategoryRepository) {}
    
    execute(): Category[] {
        const all = this.createCategoryRepository.list()
        return all
    }

}

export { ListCategoriesUseCase }
