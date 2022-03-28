import { Request, Response} from "express";
import { createOwnerLoader } from "./utils/createOwnerLoader";
import { createUserLoader } from "./utils/createUserLoader";

export type MyContext = {
    req: Request;
    res: Response;
    userLoader: ReturnType<typeof createUserLoader>;
    ownerLoader: ReturnType<typeof createOwnerLoader>;
};
