import { Request, Response } from 'express';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
    constructor(private createCategory: CreateCategoryUseCase) {}

    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;
    
        this.createCategory.execute({name, description});
    
        return response.status(201).send();
    }

}

export { CreateCategoryController }