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
        },
        identifier: {
            type: String,
            required: true,
            index: true,
        },
        digest: {
            type: String,
            required: true,
        },
        historyRecords: {
            type: [PageHistoryRecordSchema],
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

export interface IPageModel extends IPage, Document {
}

export const PageModel: Model<IPageModel> = model<IPageModel>(
    "Page",
    PageSchema,
);