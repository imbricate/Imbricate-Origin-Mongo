/**
 * @author WMXPY
 * @namespace Script
 * @description Search Scripts
 */

import { IMBRICATE_SEARCH_RESULT_TYPE, IMBRICATE_SEARCH_SNIPPET_SCRIPT_SNIPPET_SOURCE, ImbricateScriptSearchResult, ImbricateSearchScriptConfig } from "@imbricate/core";
import { IScriptModel, ScriptModel } from "../database/script/model";

export const mongoSearchScripts = async (
    keyword: string,
    config: ImbricateSearchScriptConfig,
): Promise<ImbricateScriptSearchResult[]> => {

    const scripts: IScriptModel[] = await ScriptModel.find({
        scriptName: {
            $regex: new RegExp(keyword, "i"),
        },
    }, {}, {
        limit: config.itemLimit,
    });

    return scripts.map((script: IScriptModel): ImbricateScriptSearchResult => {

        let scriptNameIndex: number;
        if (config.exact) {
            scriptNameIndex = script.scriptName.indexOf(keyword);
        } else {
            scriptNameIndex = script.scriptName.search(new RegExp(keyword, "i"));
        }

        return {
            type: IMBRICATE_SEARCH_RESULT_TYPE.SCRIPT,
            identifier: script.identifier,
            headline: script.scriptName,
            snippets: [{
                source: IMBRICATE_SEARCH_SNIPPET_SCRIPT_SNIPPET_SOURCE.NAME,
                snippet: script.scriptName,
                highlight: {
                    start: scriptNameIndex,
                    length: keyword.length,
                },
            }],
        };
    });
};
