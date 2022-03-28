import { ServiceType } from "../enums";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { Owner } from "./Owner";
import { User } from "./User";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

registerEnumType(ServiceType, {
    name: "ServiceType"
});

@ObjectType()
@Entity()
export class MobileSubscriber extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({ unique: true })
    msisdn!: string;

    @Field()
    @Column()
    customerIdOwner!: number;

    @Field()
    @Column()
    customerIdUser!: number;

    @Field()
    @ManyToOne(() => Owner, (owner) => owner.ownerSubscriber)
    owner!: Owner;

    @Field()
    @ManyToOne(() => User, (user) => user.userSubscriber)
    user!: User;

    @Field(() => ServiceType)
    @Column({
        type: "enum",
        enum: ServiceType,
    })
    serviceType!: ServiceType;

    @Field(() => String)
    @CreateDateColumn()
    serviceStartDate?: Date;
}
