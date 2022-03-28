import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Owner } from "../entities/Owner";

@Resolver()
export class OwnerResolver {
    @Query(() => [Owner])
    owners(): Promise<Owner[]> {
        return Owner.find();
    }

    @Query(() => Owner, { nullable: true })
    owner(@Arg("id") id: number): Promise<Owner | null> {
        return Owner.findOne({ where: { id } });
    }

    @Mutation(() => Owner)
    async createOwner(
        @Arg("name") name: string
    ): Promise<Owner> {
        return Owner.create({name}).save();
    }

    @Mutation(() => Owner, { nullable: true })
    async updateOwner(
        @Arg("id") id: number,
        @Arg("name", () => String, { nullable: true }) name: string
    ): Promise<Owner | null> {
        const owner = await Owner.findOne({ where: { id } });
        if (!owner) return null;
        if (typeof name !== "undefined") {
            Owner.update({id}, {name})
        }
        return owner;
    }

    @Mutation(() => Boolean)
    async deleteOwner(
        @Arg("id") id: number
    ): Promise<boolean> {
        await Owner.delete(id);
        return true;
    }
}
