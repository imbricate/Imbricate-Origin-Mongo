/**
 * @author WMXPY
 * @namespace Database_Script
 * @description Controller
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { digestStringLong } from "../../util/digest";
import { IScriptConfig } from "./interface";
import { IScriptModel, ScriptModel } from "./model";

export const createUnsavedScript = (
    scriptName: string,
    initialScript: string,
    description?: string,
): IScriptModel => {

    const identifier: string = UUIDVersion1.generateString();
    const scriptDigest: string = digestStringLong(initialScript);

    const current: Date = new Date();

    const scriptConfig: IScriptConfig = {

        scriptName,
        description,

        identifier,

        digest: scriptDigest,
        scriptDigest,

        historyRecords: [{
            updatedAt: current,
            digest: scriptDigest,
        }],

        scriptUpdatedAt: current,
    };
    return new ScriptModel(scriptConfig);
};
