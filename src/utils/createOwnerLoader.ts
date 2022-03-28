import DataLoader from "dataloader";
import { In } from "typeorm";
import { Owner } from "../entities/Owner";

// [1, 78, 8, 9]
// [{id: 1, ownername: 'tim'}, {}, {}, {}]
export const createOwnerLoader = () =>
    new DataLoader<number, Owner>(async (ownerIds) => {
        const owners = await Owner.findBy({ id: In(ownerIds as number[]) });
        const ownerIdToOwner: Record<number, Owner> = {};
        owners.forEach((u) => {
            ownerIdToOwner[u.id] = u;
        });

        const sortedOwners = ownerIds.map((ownerId) => ownerIdToOwner[ownerId]);
        // console.log("ownerIds", ownerIds);
        // console.log("map", ownerIdToOwner);
        // console.log("sortedOwners", sortedOwners);
        return sortedOwners;
    });
