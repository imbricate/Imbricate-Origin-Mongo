/**
 * @author WMXPY
 * @namespace Database_Collection
 * @description Interface
 */

export interface ICollectionConfig {

    collectionName: string;

    readonly uniqueIdentifier: string;

    description?: string;
}

export interface ICollection extends ICollectionConfig {

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
