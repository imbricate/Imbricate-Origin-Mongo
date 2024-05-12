/**
 * @author WMXPY
 * @namespace Origin
 * @description Has Collection
 */

import { CollectionModel } from "../database/collection/model";

export const mongoHasCollection = async (
    collectionName: string,
): Promise<boolean> => {

    const exists = await CollectionModel.exists({
        collectionName,
    });

    return Boolean(exists);
};
