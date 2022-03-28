import { DataSource } from "typeorm";
import { MobileSubscriber } from "./entities/MobileSubscriber";
import { Owner } from "./entities/Owner";
import { User } from "./entities/User";

export const conn = new DataSource({
    type: "postgres",
    database: "petra_test",
    username: "postgres",
    password: "admin",
    synchronize: true,
    logging: true,
    entities: [MobileSubscriber, Owner, User],
});
