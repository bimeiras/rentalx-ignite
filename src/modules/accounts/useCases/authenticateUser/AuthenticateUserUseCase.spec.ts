import { AppError } from "@shared/errors/AppError"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

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
        
        expect(async () => {
            const user = {
                email: "nonexistinguser@user.com",
                password: "1234"
            }

            await authenticateUserUseCase.execute(user)
        }).rejects.toBeInstanceOf(AppError)
        
    });

    it("should not be able to authenticate an user with incorrect password", async () => {
        expect(async () => {
            const user = {
                name: "User Name",
                password: "1234",
                email: "user@user.com",
                driver_license: "1234"
            }
    
            await createUserUseCase.execute(user)
    
            await authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPassword"
            })
        }).rejects.toBeInstanceOf(AppError) 

    })
})