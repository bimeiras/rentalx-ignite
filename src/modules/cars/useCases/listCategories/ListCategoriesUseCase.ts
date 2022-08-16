import { inject, injectable } from "tsyringe";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";

@injectable()
class ListCategoriesUseCase { 
    constructor(
        @inject("CategoriesRepository")
        private createCategoryRepository: ICategoryRepository
        ) {}
    
    async execute(): Promise<Category[]> {
        const all = await this.createCategoryRepository.list()
        return all
    }

}

export { ListCategoriesUseCase }
