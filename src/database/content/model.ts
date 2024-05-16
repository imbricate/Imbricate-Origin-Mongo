/**
 * @author WMXPY
 * @namespace Database_Content
 * @description Model
 */

import { Document, Model, Schema, model } from "mongoose";
import { IContent } from "./interface";

const ContentSchema: Schema<IContentModel> = new Schema(
    {
        sourceType: {
            type: String,
            required: true,
            index: true,
        },
        digest: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        content: {
            type: String,
            required: true,
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

export interface IContentModel extends IContent, Document {
}

export const ContentModel: Model<IContentModel> = model<IContentModel>(
    "Content",
    ContentSchema,
);
