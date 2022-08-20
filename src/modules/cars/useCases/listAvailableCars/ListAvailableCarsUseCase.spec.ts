import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let carsRepository: CarsRepositoryInMemory
let listAvailableCarsUseCase: ListAvailableCarsUseCase

describe("List cars", () => {
    beforeEach(async () => {
        carsRepository = new CarsRepositoryInMemory()
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository)
    })

    it("should be able to list all available cars", async () => {
        const car = await carsRepository.create({
            name: "Car",
            description: "Car description",
            daily_rate: 100.00,
            license_plate: "XXXX",
            fine_amount: 10.00,
            brand: "Card_brand",
            category_id: "category_id"
        })

        const cars = await listAvailableCarsUseCase.execute({})

        expect(cars).toEqual([car])
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepository.create({
            name: "Car_name_test",
            description: "Car description",
            daily_rate: 100.00,
            license_plate: "ZZZZ",
            fine_amount: 10.00,
            brand: "Car_brand",
            category_id: "category_id"
        })

        const cars = await listAvailableCarsUseCase.execute({name: "Car_name_test"})

        expect(cars).toEqual([car])
    })


    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepository.create({
            name: "Car",
            description: "Car description",
            daily_rate: 100.00,
            license_plate: "YYYY",
            fine_amount: 10.00,
            brand: "Car_brand_test",
            category_id: "category_id"
        })

        const cars = await listAvailableCarsUseCase.execute({brand: "Car_brand_test"})

        expect(cars).toEqual([car])
    })

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepository.create({
            name: "Car",
            description: "Car description",
            daily_rate: 100.00,
            license_plate: "WWWW",
            fine_amount: 10.00,
            brand: "Car_brand",
            category_id: "Card_category_test"
        })

        const cars = await listAvailableCarsUseCase.execute({category_id: "Card_category_test"})

        expect(cars).toEqual([car])
    })
})