/**
 * @author WMXPY
 * @namespace Database_Page
 * @description Model
 */

import { Document, Model, Schema, model } from "mongoose";
import { IPage } from "./interface";

const PageHistoryRecordSchema: Schema = new Schema(
    {
        updatedAt: {
            type: Date,
            required: true,
        },
        digest: {
            type: String,
            required: true,
        },
    },
    {
        _id: false,
    },
);

const PageSchema: Schema<IPageModel> = new Schema(
    {
        collectionUniqueIdentifier: {
            type: String,
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            index: true,
        },
        description: {
            type: String,
            required: false,
        },
        directories: {
            type: [String],
            required: true,
            index: true,
            default: [],
        },
        identifier: {
            type: String,
            required: true,
            index: true,
        },
        imbricateDigest: {
            type: String,
            required: true,
        },
        contentDigest: {
            type: String,
            required: true,
        },
        attributes: {
            type: Schema.Types.Mixed,
            required: true,
            default: {},
        },
        historyRecords: {
            type: [PageHistoryRecordSchema],
            required: true,
            default: [],
        },
        imbricateUpdatedAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
        methods: {
            async updateContent(this: IPageModel, contentDigest: string): Promise<IPageModel> {

                this.contentDigest = contentDigest;
                return this;
            },
        },
    },
);

export interface IPageModel extends IPage, Document {

    updateContent(contentDigest: string): IPageModel;
}

export const PageModel: Model<IPageModel> = model<IPageModel>(
    "Page",
    PageSchema,
);
