/**
 * @author WMXPY
 * @namespace Origin
 * @description Create Collection
 */

import { createUnsavedCollection } from "../database/collection/controller";

export const mongoCreateCollection = async (
    collectionName: string,
    description?: string,
): Promise<void> => {

    const newCollection = createUnsavedCollection(
        collectionName,
        description,
    );

    await newCollection.save();
};
