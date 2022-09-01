import request from "supertest";
import { v4 as uuidv4 } from "uuid"
import { hash } from "bcryptjs"


import { app } from "@shared/infra/http/app"

import { createConnection } from "@shared/infra/typeorm/data-source"
import { DataSource } from 'typeorm'

let connection: DataSource

describe("List Categories", () => {
    beforeAll( async () => {
        connection = await createConnection()
        await connection.runMigrations()

        const id = uuidv4()
        const password = await hash("admin", 8)

        await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXX' )
        `
        )

    });
    
    afterAll(async () => {
        await connection.dropDatabase()
        await connection.destroy()

    })

    it("should be able list all categories", async () => {
        const responseToken = await request(app).post("/sessions")
            .send({
                email: "admin@rentx.com",
                password: "admin"
            })
        
            const { refresh_token } = responseToken.body
        
        await request(app).post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category Supertest"
            }).set({
                Authorization: `Bearer ${refresh_token}`
            })
        
        const response = await request(app).get("/categories").send()

        expect(response.status).toBe(200)
    });
})