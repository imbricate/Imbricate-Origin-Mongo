/**
 * @author WMXPY
 * @namespace Origin
 * @description Create Script
 */

import { storeContent } from "../database/content/controller";
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

    await storeContent(newScript.digest, initialScript);

    return MongoImbricateScript.withModel(newScript);
};
