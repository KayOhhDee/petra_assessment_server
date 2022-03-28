"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOwnerLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const typeorm_1 = require("typeorm");
const Owner_1 = require("../entities/Owner");
const createOwnerLoader = () => new dataloader_1.default(async (ownerIds) => {
    const owners = await Owner_1.Owner.findBy({ id: (0, typeorm_1.In)(ownerIds) });
    const ownerIdToOwner = {};
    owners.forEach((u) => {
        ownerIdToOwner[u.id] = u;
    });
    const sortedOwners = ownerIds.map((ownerId) => ownerIdToOwner[ownerId]);
    return sortedOwners;
});
exports.createOwnerLoader = createOwnerLoader;
//# sourceMappingURL=createOwnerLoader.js.map