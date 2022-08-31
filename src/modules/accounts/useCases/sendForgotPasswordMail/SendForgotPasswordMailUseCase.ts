import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid"
import { resolve } from "path";


@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider
    ) {}

    async execute(email: string) {
        const user = this.usersRepository.findByEmail(email);

        const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs")

        if (!user) {
            throw new AppError("User does not exists!")
        }

        const token = uuidv4()
        const expires_date = this.dateProvider.addHours(3)

        const variables = {
            name: (await user).name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`
        }

        await this.usersTokensRepository.create({
            user_id: (await user).id,
            refresh_token: token,
            expires_date
        });

        await this.mailProvider.sendMail(email, "Recuperacção de Senha", variables, templatePath)
    }

}

export { SendForgotPasswordMailUseCase }