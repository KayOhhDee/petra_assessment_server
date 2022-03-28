import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";

@Resolver()
export class UserResolver {
    @Query(() => [User])
    users(): Promise<User[]> {
        return User.find();
    }

    @Query(() => User, { nullable: true })
    user(@Arg("id") id: number): Promise<User | null> {
        return User.findOne({ where: { id } });
    }

    @Mutation(() => User)
    async createUser(@Arg("name") name: string): Promise<User> {
        return User.create({ name }).save();
    }

    @Mutation(() => User, { nullable: true })
    async updateUser(
        @Arg("id") id: number,
        @Arg("name", () => String, { nullable: true }) name: string
    ): Promise<User | null> {
        const user = await User.findOne({ where: { id } });
        if (!user) return null;
        if (typeof name !== "undefined") {
            User.update({ id }, { name });
        }
        return user;
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg("id") id: number): Promise<boolean> {
        await User.delete(id);
        return true;
    }
}
