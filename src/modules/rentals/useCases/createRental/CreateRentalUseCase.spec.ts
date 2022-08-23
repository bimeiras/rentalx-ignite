import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"

import dayjs from "dayjs";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";


let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayJsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate()

    beforeEach( async () => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        dayJsDateProvider = new DayjsDateProvider()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider)
    })

    it("should be able to create a new rent", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "1234",
            car_id: "1234",
            expected_return_date: dayAdd24Hours
        })

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
    })

    it("should not be able to create a new rental if there is another open rental for the same user", async() => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "1234",
                car_id: "1234",
                expected_return_date: dayAdd24Hours
            })

            await createRentalUseCase.execute({
                user_id: "1234",
                car_id: "4321",
                expected_return_date: dayAdd24Hours
            })
        }).rejects.toBeInstanceOf(AppError)

    })

    it("should not be able to create a new rental if there is another open rental for the same car", async() => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "1234",
                car_id: "1234",
                expected_return_date: dayAdd24Hours
            })

            await createRentalUseCase.execute({
                user_id: "4321",
                car_id: "1234",
                expected_return_date: dayAdd24Hours
            })
        }).rejects.toBeInstanceOf(AppError)

    })

    it("should not be able to create a new rental with invalid return time", async() => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "1234",
                car_id: "1234",
                expected_return_date: dayjs().toDate()
            })

        }).rejects.toBeInstanceOf(AppError)

    })
})