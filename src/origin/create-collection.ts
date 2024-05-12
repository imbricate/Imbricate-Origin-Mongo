/**
 * @author WMXPY
 * @namespace Origin
 * @description Create Collection
 */

import { MongoImbricateCollection } from "../collection/collection";
import { createUnsavedCollection } from "../database/collection/controller";

export const mongoCreateCollection = async (
    collectionName: string,
    description?: string,
): Promise<MongoImbricateCollection> => {

    const newCollection = createUnsavedCollection(
        collectionName,
        description,
    );

    await newCollection.save();

    return MongoImbricateCollection.withModel(newCollection);
};
