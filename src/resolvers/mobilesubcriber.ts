import { conn } from "../typeorm-config";
import {
    Arg,
    Ctx,
    Field,
    FieldResolver,
    Float,
    InputType,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    Root,
} from "type-graphql";
import { MobileSubscriber } from "../entities/MobileSubscriber";
import { ServiceType } from "../enums";
import { Owner } from "../entities/Owner";
import { User } from "../entities/User";
import { MyContext } from "../types";

@InputType()
class MobileSubscriberInput {
    @Field()
    msisdn: string;
    @Field()
    customerIdOwner: number;
    @Field()
    customerIdUser: number;
    @Field()
    serviceType: ServiceType;
}

@ObjectType()
class PaginatedSubscribers {
    @Field(() => [MobileSubscriber])
    subscribers: MobileSubscriber[];
    @Field()
    hasMore: boolean;
}

@ObjectType()
class MobileSubscriberSummary {
    @Field(() => String)
    subscribersCount: string;
    @Field(() => String)
    subscribersPrepaidCount: string;
    @Field(() => String)
    subscribersPostpaidCount: string;
}

@Resolver(MobileSubscriber)
export class MobileSubscriberResolver {
    @FieldResolver(() => Owner)
    ownerSubscriber(
        @Root() subscriber: MobileSubscriber,
        @Ctx() { ownerLoader }: MyContext
    ) {
        return ownerLoader.load(subscriber.customerIdOwner);
    }

    @FieldResolver(() => User)
    userSubscriber(
        @Root() subscriber: MobileSubscriber,
        @Ctx() { userLoader }: MyContext
    ) {
        return userLoader.load(subscriber.customerIdUser);
    }

    @Query(() => MobileSubscriberSummary)
    async mobileSubscriberSummary() {
         const [{ count: subscribersCount }] = await conn.query(
             `
            select count(p.*)
            from mobile_subscriber p
            `
         );
        const [{ count: subscribersPrepaidCount }] = await conn.query(
            `
            select count(p.*)
            from mobile_subscriber p
            where p."serviceType" = 'MOBILE_PREPAID'
            `
        );
        const [{ count: subscribersPostpaidCount }] = await conn.query(
            `
            select count(p.*)
            from mobile_subscriber p
            where p."serviceType" = 'MOBILE_POSTPAID'
            `
        );

        return {
            subscribersCount,
            subscribersPrepaidCount,
            subscribersPostpaidCount,
        };
    }

    @Query(() => PaginatedSubscribers)
    async subscribers(
        @Arg("limit", () => Int) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null
    ): Promise<PaginatedSubscribers> {
        const realLimit = Math.min(50, limit);
        const reaLimitPlusOne = realLimit + 1;

        const replacements: any[] = [reaLimitPlusOne];

        if (cursor) {
            replacements.push(new Date(parseInt(cursor)));
        }

        const subscribers = await conn.query(
            `
            select p.*
            from mobile_subscriber p
            ${cursor ? `where p."serviceStartDate" < $2` : ""}
            order by p."serviceStartDate" DESC
            limit $1
            `,
            replacements
        );

        return {
            subscribers: subscribers.slice(0, realLimit),
            hasMore: subscribers.length === reaLimitPlusOne,
        };
    }

    @Query(() => MobileSubscriber, { nullable: true })
    mobileSubscriber(@Arg("id") id: number): Promise<MobileSubscriber | null> {
        return MobileSubscriber.findOne({ where: { id } });
    }

    @Mutation(() => MobileSubscriber)
    async createMobileSubscriber(
        @Arg("info") info: MobileSubscriberInput
    ): Promise<MobileSubscriber> {
        return MobileSubscriber.create(info).save();
    }

    @Mutation(() => MobileSubscriber, { nullable: true })
    async updateMobileSubscriber(
        @Arg("id") id: number,
        @Arg("info", () => MobileSubscriberInput, { nullable: true })
        info: MobileSubscriberInput
    ): Promise<MobileSubscriber | null> {
        const mobileSubscriber = await MobileSubscriber.findOne({
            where: { id },
        });
        if (!mobileSubscriber) return null;
        if (typeof info !== "undefined") {
            await MobileSubscriber.update({ id }, info);
        }
        return mobileSubscriber;
    }

    @Mutation(() => Boolean)
    async deleteMobileSubscriber(@Arg("id") id: number): Promise<boolean> {
        await MobileSubscriber.delete(id);
        return true;
    }
}
