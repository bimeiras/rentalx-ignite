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
    
    async create({user_id, car_id, expected_return_date, id, end_date, total}: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({user_id, car_id, expected_return_date, id, end_date, total})

        await this.repository.save(rental)

        return rental
    }
    
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return await this.repository.findOne({
            where: { car_id, end_date: null}
        })
    }
    
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return await this.repository.findOne({
            where: { user_id, end_date: null}
        })
    }

    async findById(id: string): Promise<Rental> {
        return await this.repository.findOneBy({id})
    }
    
    async findByUser(user_id: string): Promise<Rental[]> {
        const rentals = await this.repository.findBy({
            user_id
        })

        return rentals
    }
}

export { RentalsRepository }