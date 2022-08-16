import { Repository } from "typeorm";
import { dataSource } from "../../../../shared/infra/typeorm/data-source";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../typeorm/entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";



class UsersRepository implements IUsersRepository {
    private repository: Repository<User>

    constructor () {
        this.repository = dataSource.getRepository(User)
    }
    
    async create({name, password, email, driver_license, avatar, id}: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            password,
            email,
            driver_license,
            avatar,
            id
        });

        await this.repository.save(user)
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOneBy({email})

        return user
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOneBy({id})

        return user
    }

}

export { UsersRepository }