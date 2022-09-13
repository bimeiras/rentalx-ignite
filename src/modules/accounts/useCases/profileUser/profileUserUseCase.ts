import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDto";
import { UserMap } from "@modules/accounts/mapper/UserMap";

@injectable()
class ProfileUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ){}
    
    async execute(id: string): Promise<IUserResponseDTO> {
        const user = await this.userRepository.findById(id)

        return UserMap.toDTO(user)

    }
}

export { ProfileUserUseCase }