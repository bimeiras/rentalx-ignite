import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"

import dayjs from "dayjs";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate()

    beforeEach(async () => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        dayJsDateProvider = new DayjsDateProvider()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider, carsRepositoryInMemory)
    })

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name",
            description: "Description",
            daily_rate: 100,
            license_plate: "ABC1234",
            fine_amount: 10,
            category_id: "1234",
            brand: "Brand"
        })

        const rental = await createRentalUseCase.execute({
            user_id: "1234",
            car_id: car.id,
            expected_return_date: dayAdd24Hours
        })

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
    })

    it("should not be able to create a new rental if there is another open rental for the same user", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "1111",
            expected_return_date: dayAdd24Hours,
            user_id: "12345"
        })

        await expect(createRentalUseCase.execute({
            user_id: "12345",
            car_id: "123123",
            expected_return_date: dayAdd24Hours
        })).rejects.toEqual(new AppError("Already exists an open rental for this user!"))

    })

    it("should not be able to create a new rental if there is another open rental for the same car", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "test",
            expected_return_date: dayAdd24Hours,
            user_id: "12345"
        })

        await expect(createRentalUseCase.execute({
            user_id: "54321",
            car_id: "test",
            expected_return_date: dayAdd24Hours
        })).rejects.toEqual(new AppError("This car is unavailable!"))

    })

    it("should not be able to create a new rental with invalid return time", async () => {
        await expect(createRentalUseCase.execute({
            user_id: "123",
            car_id: "test",
            expected_return_date: dayjs().toDate()
        })).rejects.toEqual(new AppError("Invalid return time"))

    })
})