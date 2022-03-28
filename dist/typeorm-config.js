"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conn = void 0;
const typeorm_1 = require("typeorm");
const MobileSubscriber_1 = require("./entities/MobileSubscriber");
const Owner_1 = require("./entities/Owner");
const User_1 = require("./entities/User");
exports.conn = new typeorm_1.DataSource({
    type: "postgres",
    database: "petra_test",
    username: "postgres",
    password: "admin",
    synchronize: true,
    logging: true,
    entities: [MobileSubscriber_1.MobileSubscriber, Owner_1.Owner, User_1.User],
});
//# sourceMappingURL=typeorm-config.js.map