import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory


describe("Create car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
    })

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name",
            description: "Description",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        })


        expect(car).toHaveProperty("id")
    });

    it("should not be able to create a car when license plate is already taken", async () => {

        await createCarUseCase.execute({
            name: "Same Car",
            description: "Same Description",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Same Brand",
            category_id: "category"
        })

        await expect(createCarUseCase.execute({
            name: "Same Car",
            description: "Same Description",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Same Brand",
            category_id: "category"
        })

        ).rejects.toEqual(new AppError("Car already exists"))
    })

    it("it should be available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car available",
            description: "Description available",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Same Brand",
            category_id: "category"
        });

        expect(car.available).toBe(true)
    })

}) 