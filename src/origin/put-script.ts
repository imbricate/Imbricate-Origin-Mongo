/**
 * @author WMXPY
 * @namespace Origin
 * @description Put Script
 */

import { ImbricateScriptMetadata } from "@imbricate/core";
import { storeContent } from "../database/content/controller";
import { IScriptConfig } from "../database/script/interface";
import { ScriptModel } from "../database/script/model";
import { MongoImbricateScript } from "../script/script";
import { digestStringLong } from "../util/digest";

export const mongoPutScript = async (
    scriptMetadata: ImbricateScriptMetadata,
    script: string,
): Promise<MongoImbricateScript> => {

    const scriptDigest: string = digestStringLong(script);

    const scriptConfig: IScriptConfig = {

        scriptName: scriptMetadata.scriptName,
        description: scriptMetadata.description,

        identifier: scriptMetadata.identifier,

        imbricateDigest: scriptMetadata.digest,
        scriptDigest,

        historyRecords: scriptMetadata.historyRecords,

        imbricateUpdatedAt: scriptMetadata.updatedAt,
    };

    const scriptModel = new ScriptModel(scriptConfig);

    await storeContent(scriptDigest, script);
    await scriptModel.save();

    return MongoImbricateScript.withModel(scriptModel);
};
