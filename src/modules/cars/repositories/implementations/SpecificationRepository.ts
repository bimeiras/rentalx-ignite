import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";
import { Specification } from "../../entities/Specification"

class SpecificationRepository implements ISpecificationRepository {
    private specificationRepository: Specification[];
    
    constructor() {
        this.specificationRepository = [];
    }

    findByName(name: string): Specification {
        const specification = this.specificationRepository.find(specification => specification.name === name)
        return specification
    }
    
    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date()
        });

        this.specificationRepository.push(specification);
    }

}

export { SpecificationRepository }