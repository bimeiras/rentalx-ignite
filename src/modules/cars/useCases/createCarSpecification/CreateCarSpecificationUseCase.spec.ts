import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepository: CarsRepositoryInMemory
let specificationsRepository: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
    
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory()
        specificationsRepository = new SpecificationsRepositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepository, specificationsRepository)
    })

    it("should not be able to add specification to a non-existing car", async() => {
       
        expect(async () => {
            const car_id = "1234"
            const specifications_id = ["1234"]

            await createCarSpecificationUseCase.execute({car_id, specifications_id})
      
        }).rejects.toBeInstanceOf(AppError) 
    
    })

    it("should be able to add a new specification to the car", async() => {
        const car = await carsRepository.create({
            name: "Car Name",
            description: "Car Description",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        })

        const specification = await specificationsRepository.create({
            name: "Specification name test",
            description: "Specification description test"
        })

        const specifications_id = [specification.id]

        const specificationsCars = await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id})
        
        expect(specificationsCars).toHaveProperty("specifications")
        expect(specificationsCars.specifications.length).toBe(1)
    })
})