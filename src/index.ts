import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { MobileSubscriberResolver } from "./resolvers/mobilesubcriber";
import { OwnerResolver } from "./resolvers/owner";
import { UserResolver } from "./resolvers/user";
import { conn } from "./typeorm-config";
import { MyContext } from "./types";
import { createOwnerLoader } from "./utils/createOwnerLoader";
import { createUserLoader } from "./utils/createUserLoader";

const main = async () => {
    await conn.initialize().catch((error) => {
        throw error;
    });

    const app = express();

    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [OwnerResolver, UserResolver, MobileSubscriberResolver],
            validate: false,
        }),
        context: ({ req, res }): MyContext => ({
            req,
            res,
            userLoader: createUserLoader(),
            ownerLoader: createOwnerLoader(),
        }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });

    // creates a graphql end point on express
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(4000, () => {
        console.log("server started on localhost:4000");
    });
};

main().catch((err) => {
    console.log(err);
});
