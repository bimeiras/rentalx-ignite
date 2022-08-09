import { DataSource } from "typeorm";
import { CreateCategories1659956872005 } from "./migrations/1659956872005-CreateCategories";
import { Category } from "../modules/cars/entities/Category";

export const dataSource = new DataSource({
    type: "postgres",
    port: 5432,
    host: "localhost",
    username: "docker",
    password: "ignite",
    database: "rentx",
    entities: [
      Category
    ],
    migrations: [
        CreateCategories1659956872005
    ],
  });

export function createConnection(host = "database"): Promise<DataSource> {
    return dataSource.setOptions({ host }).initialize();
}