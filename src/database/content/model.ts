/**
 * @author WMXPY
 * @namespace Database_Collection
 * @description Model
 */

import { Document, Model, Schema, model } from "mongoose";
import { ICollection } from "./interface";

const CollectionSchema: Schema<ICollectionModel> = new Schema(
    {
        collectionName: {
            type: String,
            required: true,
            index: true,
            unique: true,
        },
        uniqueIdentifier: {
            type: String,
            required: true,
            index: true,
            unique: true,
        },
        description: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
        methods: {},
    },
);

export interface ICollectionModel extends ICollection, Document {
}

export const CollectionModel: Model<ICollectionModel> = model<ICollectionModel>(
    "Collection",
    CollectionSchema,
);
