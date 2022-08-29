import { AppError } from "@shared/errors/AppError"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"

let usersRepositoryInMemory: UsersRepositoryInMemory
let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    });

    it("should be able to authenticating a user", async () => {
        const user = {
            name: "New User Name",
            password: "1234",
            email: "newuser@user.com",
            driver_license: "1234"
        }

        await createUserUseCase.execute(user)
        
        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty("token")

    });

    it("should not be able to authenticate a nonexisting user", async () => {
        
        await expect(authenticateUserUseCase.execute({
            email: "nonexistinguser@user.com",
            password: "1234"
        })).rejects.toEqual(new AppError("Email or password incorrect!"))
        
    });

    it("should not be able to authenticate an user with incorrect password", async () => {
        const user: ICreateUserDTO = {
            name: "User Name",
            password: "1234",
            email: "user@user.com",
            driver_license: "1234"
        }
    
        await createUserUseCase.execute(user)
        
        await expect(authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPassword"
                })
        ).rejects.toEqual(new AppError("Email or password incorrect!")) 

    })
})