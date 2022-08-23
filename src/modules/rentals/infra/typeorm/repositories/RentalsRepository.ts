import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { dataSource } from "@shared/infra/typeorm/data-source";
import { Repository } from "typeorm";
import { Rental } from "../entities/Rental";



class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>

    constructor() {
        this.repository = dataSource.getRepository(Rental)
    }
    
    async create({user_id, car_id, expected_return_date}: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({user_id, car_id, expected_return_date})

        await this.repository.save(rental)

        return rental
    }
    
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return await this.repository.findOneBy({car_id})
    }
    
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return await this.repository.findOneBy({user_id})
    }
    
}

export { RentalsRepository }