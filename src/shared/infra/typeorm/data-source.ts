import { DataSource } from "typeorm";
import { CreateCategories1659956872005 } from "./migrations/1659956872005-CreateCategories";
import { Category } from "../../../modules/cars/infra/typeorm/entities/Category";
import { CreateSpecifications1660130872589 } from "./migrations/1660130872589-CreateSpecifications";
import { Specification } from "../../../modules/cars/infra/typeorm/entities/Specification";
import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { CreateUsers1660133651430 } from "./migrations/1660133651430-CreateUsers";
import { AlterUserDeleteUsername1660215562252 } from "./migrations/1660215562252-AlterUserDeleteUsername";
import { AlterUserAddAvatar1660324763151 } from "./migrations/1660324763151-AlterUserAddAvatar";
import { CreateCars1660736040272 } from "./migrations/1660736040272-CreateCars";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CreateSpecificationsCars1661015773997 } from "./migrations/1661015773997-CreateSpecificationsCars";
import { CreateCarImages1661210336735 } from "./migrations/1661210336735-CreateCarImages";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { CreateRentals1661212989013 } from "./migrations/1661212989013-CreateRentals";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { CreateUsersToken1661854810090 } from "./migrations/1661854810090-CreateUsersToken";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

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
      User,
      Car,
      CarImage,
      Rental,
      UserTokens
    ],
    migrations: [
        CreateCategories1659956872005,
        CreateSpecifications1660130872589,
        CreateUsers1660133651430,
        AlterUserDeleteUsername1660215562252,
        AlterUserAddAvatar1660324763151,
        CreateCars1660736040272,
        CreateSpecificationsCars1661015773997,
        CreateCarImages1661210336735,
        CreateRentals1661212989013,
        CreateUsersToken1661854810090
    ],
  });

export function createConnection(host = "database"): Promise<DataSource> {
    return dataSource.setOptions({
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database: process.env.NODE_ENV === "test" ? "rentx_test" : dataSource.options.database as string,
    }).initialize();
}