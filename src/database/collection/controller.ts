/**
 * @author WMXPY
 * @namespace Database_Collection
 * @description Controller
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { ICollectionConfig } from "./interface";
import { CollectionModel, ICollectionModel } from "./model";

export const createUnsavedCollection = (
    collectionName: string,
    description?: string,
): ICollectionModel => {

    const uniqueIdentifier: string = UUIDVersion1.generateString();

    const collectionConfig: ICollectionConfig = {

        collectionName,
        uniqueIdentifier,
        description,
    };
    return new CollectionModel(collectionConfig);
};
