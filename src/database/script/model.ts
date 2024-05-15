/**
 * @author WMXPY
 * @namespace Database_Script
 * @description Model
 */

import { Document, Model, Schema, model } from "mongoose";
import { IScript } from "./interface";

const ScriptHistoryRecordSchema: Schema = new Schema(
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

const ScriptSchema: Schema<IScriptModel> = new Schema(
    {
        scriptName: {
            type: String,
            required: true,
            index: true,
        },
        description: {
            type: String,
            required: false,
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
        scriptDigest: {
            type: String,
            required: true,
        },
        historyRecords: {
            type: [ScriptHistoryRecordSchema],
            required: true,
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
            async updateScript(this: IScriptModel, contentDigest: string): Promise<IScriptModel> {

                this.scriptDigest = contentDigest;
                return this;
            },
        },
    },
);

export interface IScriptModel extends IScript, Document {

    updateScript(contentDigest: string): IScriptModel;
}

export const ScriptModel: Model<IScriptModel> = model<IScriptModel>(
    "Script",
    ScriptSchema,
);
