import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";



class UsersRepositoryInMemory implements IUsersRepository {
    usersRepository: User[] = []
    
    
    async create({name, password, email, driver_license }: ICreateUserDTO): Promise<void> {
        const user = new User()

        Object.assign(user, {
            name,
            password,
            email,
            driver_license
        })

        this.usersRepository.push(user)
        
    }

    async findByEmail(email: string): Promise<User> {
        return this.usersRepository.find(user => user.email === email)
    }
    
    async findById(id: string): Promise<User> {
        return this.usersRepository.find(user => user.id === id)
    }

}

export { UsersRepositoryInMemory }