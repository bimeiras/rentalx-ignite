import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";



class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    userTokens: UserTokens[] = []

    async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = new UserTokens();

        Object.assign(userToken, {
            user_id,
            expires_date,
            refresh_token
        });

        this.userTokens.push(userToken)

        return userToken

    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        return this.userTokens.find(ut => ut.user_id === user_id && ut.refresh_token === refresh_token);
    }

    async deleteById(id: string): Promise<void> {
        const userToken = this.userTokens.find(ut => ut.id === id)
        this.userTokens.splice(this.userTokens.indexOf(userToken));
    }
    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        return this.userTokens.find(ut => ut.refresh_token === refresh_token);
    }
    
}

export { UsersTokensRepositoryInMemory }