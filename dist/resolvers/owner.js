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
exports.OwnerResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Owner_1 = require("../entities/Owner");
let OwnerResolver = class OwnerResolver {
    owners() {
        return Owner_1.Owner.find();
    }
    owner(id) {
        return Owner_1.Owner.findOne({ where: { id } });
    }
    async createOwner(name) {
        return Owner_1.Owner.create({ name }).save();
    }
    async updateOwner(id, name) {
        const owner = await Owner_1.Owner.findOne({ where: { id } });
        if (!owner)
            return null;
        if (typeof name !== "undefined") {
            Owner_1.Owner.update({ id }, { name });
        }
        return owner;
    }
    async deleteOwner(id) {
        await Owner_1.Owner.delete(id);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Owner_1.Owner]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OwnerResolver.prototype, "owners", null);
__decorate([
    (0, type_graphql_1.Query)(() => Owner_1.Owner, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OwnerResolver.prototype, "owner", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Owner_1.Owner),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OwnerResolver.prototype, "createOwner", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Owner_1.Owner, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("name", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], OwnerResolver.prototype, "updateOwner", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OwnerResolver.prototype, "deleteOwner", null);
OwnerResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], OwnerResolver);
exports.OwnerResolver = OwnerResolver;
//# sourceMappingURL=owner.js.map