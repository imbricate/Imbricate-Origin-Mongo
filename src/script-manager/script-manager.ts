/**
 * @author WMXPY
 * @namespace Mongo_ScriptManager
 * @description Script Manager
 */

import { IImbricateScript, IImbricateScriptManager, IMBRICATE_SCRIPT_MANAGER_CAPABILITY_KEY, ImbricateNotImplemented, ImbricateScriptManagerBase, ImbricateScriptManagerCapability, ImbricateScriptMetadata, ImbricateScriptQuery, ImbricateScriptQueryConfig, ImbricateScriptSearchResult, ImbricateScriptSnapshot, ImbricateSearchScriptConfig } from "@imbricate/core";
import { IScriptModel, ScriptModel } from "../database/script/model";
import { mongoCreateScript } from "../origin/create-script";
import { mongoPutScript } from "../origin/put-script";
import { MongoImbricateScript } from "../script/script";
import { mongoSearchScripts } from "../script/search-scripts";

export class MongoImbricateScriptManager extends ImbricateScriptManagerBase implements IImbricateScriptManager {

    public static create(): MongoImbricateScriptManager {

        return new MongoImbricateScriptManager();
    }

    private constructor() {
        super();
    }

    public get capabilities(): ImbricateScriptManagerCapability {
        return ImbricateScriptManagerBase.allAllowCapability();
    }

    public async createScript(
        scriptName: string,
        initialScript: string,
        description?: string,
    ): Promise<IImbricateScript> {

        return mongoCreateScript(
            scriptName,
            initialScript,
            description,
        );
    }

    public async hasScript(
        scriptName: string,
    ): Promise<boolean> {

        const ifExist = await ScriptModel.exists({
            scriptName,
        });
        return Boolean(ifExist);
    }

    public async getScript(
        identifier: string,
    ): Promise<IImbricateScript | null> {

        const script = await ScriptModel.findOne({
            identifier,
        });

        if (!script) {
            return null;
        }
        return MongoImbricateScript.withModel(script);
    }

    public async putScript(
        scriptMetadata: ImbricateScriptMetadata,
        script: string,
    ): Promise<IImbricateScript> {

        return await mongoPutScript(
            scriptMetadata,
            script,
        );
    }

    public async renameScript(
        identifier: string,
        newScriptName: string,
    ): Promise<void> {

        await ScriptModel.updateOne({
            identifier,
        }, {
            scriptName: newScriptName,
        });
    }

    public async listScripts(): Promise<ImbricateScriptSnapshot[]> {

        const scripts = await ScriptModel.find({});

        return scripts.map((script: IScriptModel): ImbricateScriptSnapshot => {
            return {
                identifier: script.identifier,
                scriptName: script.scriptName,
            };
        });
    }

    public async deleteScript(
        identifier: string,
    ): Promise<void> {

        await ScriptModel.deleteOne({
            identifier,
        });
    }

    public async searchScripts(
        keyword: string,
        config: ImbricateSearchScriptConfig,
    ): Promise<ImbricateScriptSearchResult[]> {

        return await mongoSearchScripts(
            keyword,
            config,
        );
    }

    public async queryScripts(
        _query: ImbricateScriptQuery,
        _config: ImbricateScriptQueryConfig,
    ): Promise<IImbricateScript[]> {

        throw ImbricateNotImplemented.create(
            "queryScripts",
            IMBRICATE_SCRIPT_MANAGER_CAPABILITY_KEY.GET_SCRIPT,
        );
    }
}
