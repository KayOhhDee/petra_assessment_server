"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileSubscriberResolver = void 0;
const typeorm_config_1 = require("../typeorm-config");
const type_graphql_1 = require("type-graphql");
const MobileSubscriber_1 = require("../entities/MobileSubscriber");
const enums_1 = require("../enums");
const Owner_1 = require("../entities/Owner");
const User_1 = require("../entities/User");
let MobileSubscriberInput = class MobileSubscriberInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], MobileSubscriberInput.prototype, "msisdn", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], MobileSubscriberInput.prototype, "customerIdOwner", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], MobileSubscriberInput.prototype, "customerIdUser", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], MobileSubscriberInput.prototype, "serviceType", void 0);
MobileSubscriberInput = __decorate([
    (0, type_graphql_1.InputType)()
], MobileSubscriberInput);
let PaginatedSubscribers = class PaginatedSubscribers {
};
__decorate([
    (0, type_graphql_1.Field)(() => [MobileSubscriber_1.MobileSubscriber]),
    __metadata("design:type", Array)
], PaginatedSubscribers.prototype, "subscribers", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PaginatedSubscribers.prototype, "hasMore", void 0);
PaginatedSubscribers = __decorate([
    (0, type_graphql_1.ObjectType)()
], PaginatedSubscribers);
let MobileSubscriberSummary = class MobileSubscriberSummary {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], MobileSubscriberSummary.prototype, "subscribersCount", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], MobileSubscriberSummary.prototype, "subscribersPrepaidCount", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], MobileSubscriberSummary.prototype, "subscribersPostpaidCount", void 0);
MobileSubscriberSummary = __decorate([
    (0, type_graphql_1.ObjectType)()
], MobileSubscriberSummary);
let MobileSubscriberResolver = class MobileSubscriberResolver {
    ownerSubscriber(subscriber, { ownerLoader }) {
        return ownerLoader.load(subscriber.customerIdOwner);
    }
    userSubscriber(subscriber, { userLoader }) {
        return userLoader.load(subscriber.customerIdUser);
    }
    async mobileSubscriberSummary() {
        const [{ count: subscribersCount }] = await typeorm_config_1.conn.query(`
            select count(p.*)
            from mobile_subscriber p
            `);
        const [{ count: subscribersPrepaidCount }] = await typeorm_config_1.conn.query(`
            select count(p.*)
            from mobile_subscriber p
            where p."serviceType" = 'MOBILE_PREPAID'
            `);
        const [{ count: subscribersPostpaidCount }] = await typeorm_config_1.conn.query(`
            select count(p.*)
            from mobile_subscriber p
            where p."serviceType" = 'MOBILE_POSTPAID'
            `);
        return {
            subscribersCount,
            subscribersPrepaidCount,
            subscribersPostpaidCount,
        };
    }
    async subscribers(limit, cursor) {
        const realLimit = Math.min(50, limit);
        const reaLimitPlusOne = realLimit + 1;
        const replacements = [reaLimitPlusOne];
        if (cursor) {
            replacements.push(new Date(parseInt(cursor)));
        }
        const subscribers = await typeorm_config_1.conn.query(`
            select p.*
            from mobile_subscriber p
            ${cursor ? `where p."serviceStartDate" < $2` : ""}
            order by p."serviceStartDate" DESC
            limit $1
            `, replacements);
        return {
            subscribers: subscribers.slice(0, realLimit),
            hasMore: subscribers.length === reaLimitPlusOne,
        };
    }
    mobileSubscriber(id) {
        return MobileSubscriber_1.MobileSubscriber.findOne({ where: { id } });
    }
    async createMobileSubscriber(info) {
        return MobileSubscriber_1.MobileSubscriber.create(info).save();
    }
    async updateMobileSubscriber(id, info) {
        const mobileSubscriber = await MobileSubscriber_1.MobileSubscriber.findOne({
            where: { id },
        });
        if (!mobileSubscriber)
            return null;
        if (typeof info !== "undefined") {
            await MobileSubscriber_1.MobileSubscriber.update({ id }, info);
        }
        return mobileSubscriber;
    }
    async deleteMobileSubscriber(id) {
        await MobileSubscriber_1.MobileSubscriber.delete(id);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(() => Owner_1.Owner),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MobileSubscriber_1.MobileSubscriber, Object]),
    __metadata("design:returntype", void 0)
], MobileSubscriberResolver.prototype, "ownerSubscriber", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => User_1.User),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MobileSubscriber_1.MobileSubscriber, Object]),
    __metadata("design:returntype", void 0)
], MobileSubscriberResolver.prototype, "userSubscriber", null);
__decorate([
    (0, type_graphql_1.Query)(() => MobileSubscriberSummary),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MobileSubscriberResolver.prototype, "mobileSubscriberSummary", null);
__decorate([
    (0, type_graphql_1.Query)(() => PaginatedSubscribers),
    __param(0, (0, type_graphql_1.Arg)("limit", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("cursor", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MobileSubscriberResolver.prototype, "subscribers", null);
__decorate([
    (0, type_graphql_1.Query)(() => MobileSubscriber_1.MobileSubscriber, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MobileSubscriberResolver.prototype, "mobileSubscriber", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => MobileSubscriber_1.MobileSubscriber),
    __param(0, (0, type_graphql_1.Arg)("info")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MobileSubscriberInput]),
    __metadata("design:returntype", Promise)
], MobileSubscriberResolver.prototype, "createMobileSubscriber", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => MobileSubscriber_1.MobileSubscriber, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("info", () => MobileSubscriberInput, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, MobileSubscriberInput]),
    __metadata("design:returntype", Promise)
], MobileSubscriberResolver.prototype, "updateMobileSubscriber", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MobileSubscriberResolver.prototype, "deleteMobileSubscriber", null);
MobileSubscriberResolver = __decorate([
    (0, type_graphql_1.Resolver)(MobileSubscriber_1.MobileSubscriber)
], MobileSubscriberResolver);
exports.MobileSubscriberResolver = MobileSubscriberResolver;
//# sourceMappingURL=mobilesubcriber.js.map