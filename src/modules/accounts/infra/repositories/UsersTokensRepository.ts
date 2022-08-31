import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { dataSource } from "@shared/infra/typeorm/data-source";
import { Repository } from "typeorm";
import { UserTokens } from "../typeorm/entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {

    private repository: Repository<UserTokens>

    constructor() {
        this.repository = dataSource.getRepository(UserTokens)
    }
    
    async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            user_id,
            expires_date,
            refresh_token
        });

        await this.repository.save(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        const usersTokens = await this.repository.findOneBy({
            user_id,
            refresh_token

        })

        return usersTokens
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id)
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = await this.repository.findOneBy({ refresh_token })

        return userToken
    }

}

export { UsersTokensRepository }