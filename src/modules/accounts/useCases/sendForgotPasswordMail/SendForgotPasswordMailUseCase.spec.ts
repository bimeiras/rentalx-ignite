import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe("Send Forgot Mail", () => {
    beforeEach(async() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        dateProvider = new DayjsDateProvider()
        mailProvider = new MailProviderInMemory()
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider)
    })

    it("should be able to send a forgot password mail to user", async() => {
        const sendMail = jest.spyOn(mailProvider, "sendMail" )
        
        await usersRepositoryInMemory.create({
            name: "Essie Mendoza",
            email: "murpeile@fo.ml",
            driver_license: "776380",
            password: "1234"
        })

        await sendForgotPasswordMailUseCase.execute("murpeile@fo.ml")

        expect(sendMail).toHaveBeenCalled()
    });

    it("should not be able to send forgot email password if user does not exist", async() => {
        await expect(sendForgotPasswordMailUseCase.execute("fi@cuhwide.vu"))
        .rejects.toEqual(new AppError("User does not exists!"))
    });

    it("should be able to create an user's token", async() => {
        const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create")

        await usersRepositoryInMemory.create({
            name: "Isaiah Paul",
            email: "fuac@kamjebub.ma",
            driver_license: "095980",
            password: "1234"
        })

        await sendForgotPasswordMailUseCase.execute("fuac@kamjebub.ma")

        expect(generateTokenMail).toBeCalled()
    })

})