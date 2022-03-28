import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MobileSubscriber } from "./MobileSubscriber";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt?: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt?: Date;

    @Field()
    @Column()
    name!: string;

    @OneToMany(() => MobileSubscriber, (ms) => ms.user)
    userSubscriber: MobileSubscriber[];
}
