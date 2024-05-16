/**
 * @author WMXPY
 * @namespace Origin
 * @description Create Script
 */

import { storeContent } from "../database/content/controller";
import { CONTENT_SOURCE_TYPE } from "../database/content/interface";
import { createUnsavedScript } from "../database/script/controller";
import { MongoImbricateScript } from "../script/script";

export const mongoCreateScript = async (
    scriptName: string,
    initialScript: string,
    description?: string,
): Promise<MongoImbricateScript> => {

    const newScript = createUnsavedScript(
        scriptName,
        initialScript,
        description,
    );

    await newScript.save();

    await storeContent(
        CONTENT_SOURCE_TYPE.SCRIPT,
        newScript.scriptDigest,
        initialScript,
    );

    return MongoImbricateScript.withModel(newScript);
};
