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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileSubscriber = void 0;
const enums_1 = require("../enums");
const type_graphql_1 = require("type-graphql");
const Owner_1 = require("./Owner");
const User_1 = require("./User");
const typeorm_1 = require("typeorm");
(0, type_graphql_1.registerEnumType)(enums_1.ServiceType, {
    name: "ServiceType"
});
let MobileSubscriber = class MobileSubscriber extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MobileSubscriber.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], MobileSubscriber.prototype, "msisdn", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MobileSubscriber.prototype, "customerIdOwner", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MobileSubscriber.prototype, "customerIdUser", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.ManyToOne)(() => Owner_1.Owner, (owner) => owner.ownerSubscriber),
    __metadata("design:type", Owner_1.Owner)
], MobileSubscriber.prototype, "owner", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.userSubscriber),
    __metadata("design:type", User_1.User)
], MobileSubscriber.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => enums_1.ServiceType),
    (0, typeorm_1.Column)({
        type: "enum",
        enum: enums_1.ServiceType,
    }),
    __metadata("design:type", String)
], MobileSubscriber.prototype, "serviceType", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MobileSubscriber.prototype, "serviceStartDate", void 0);
MobileSubscriber = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], MobileSubscriber);
exports.MobileSubscriber = MobileSubscriber;
//# sourceMappingURL=MobileSubscriber.js.map