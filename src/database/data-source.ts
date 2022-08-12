import { DataSource } from "typeorm";
import { CreateCategories1659956872005 } from "./migrations/1659956872005-CreateCategories";
import { Category } from "../modules/cars/entities/Category";
import { CreateSpecifications1660130872589 } from "./migrations/1660130872589-CreateSpecifications";
import { Specification } from "../modules/cars/entities/Specification";
import { User } from "../modules/accounts/entities/User";
import { CreateUsers1660133651430 } from "./migrations/1660133651430-CreateUsers";
import { AlterUserDeleteUsername1660215562252 } from "./migrations/1660215562252-AlterUserDeleteUsername";
import { AlterUserAddAvatar1660324763151 } from "./migrations/1660324763151-AlterUserAddAvatar";

export const dataSource = new DataSource({
    type: "postgres",
    port: 5432,
    host: "localhost",
    username: "docker",
    password: "ignite",
    database: "rentx",
    entities: [
      Category,
      Specification,
      User
    ],
    migrations: [
        CreateCategories1659956872005,
        CreateSpecifications1660130872589,
        CreateUsers1660133651430,
        AlterUserDeleteUsername1660215562252,
        AlterUserAddAvatar1660324763151
    ],
  });

export function createConnection(host = "database"): Promise<DataSource> {
    return dataSource.setOptions({ host }).initialize();
}