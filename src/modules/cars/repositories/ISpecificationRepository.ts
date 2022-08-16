import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {
    findByName(name: string): Promise<Specification>;
    create({name, description}: ICreateSpecificationDTO): Promise<void>
}

export { ISpecificationRepository, ICreateSpecificationDTO }