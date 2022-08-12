import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";
import { Specification } from "../../entities/Specification"
import { Repository } from "typeorm";
import { dataSource } from "../../../../database/data-source";

class SpecificationRepository implements ISpecificationRepository {
    
    private repository: Repository<Specification>
    
    constructor() {
        this.repository = dataSource.getRepository(Specification)
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOneBy({name})
        return specification
    }
    
    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            name, 
            description
        })

        await this.repository.save(specification)

    }

}

export { SpecificationRepository }