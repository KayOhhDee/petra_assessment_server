"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const mobilesubcriber_1 = require("./resolvers/mobilesubcriber");
const owner_1 = require("./resolvers/owner");
const user_1 = require("./resolvers/user");
const typeorm_config_1 = require("./typeorm-config");
const createOwnerLoader_1 = require("./utils/createOwnerLoader");
const createUserLoader_1 = require("./utils/createUserLoader");
const main = async () => {
    await typeorm_config_1.conn.initialize().catch((error) => {
        throw error;
    });
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [owner_1.OwnerResolver, user_1.UserResolver, mobilesubcriber_1.MobileSubscriberResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            userLoader: (0, createUserLoader_1.createUserLoader)(),
            ownerLoader: (0, createOwnerLoader_1.createOwnerLoader)(),
        }),
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log("server started on localhost:4000");
    });
};
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map