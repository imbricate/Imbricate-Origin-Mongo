/**
 * @author WMXPY
 * @namespace Mongo_ScriptManager
 * @description Script Manager
 */

import { IImbricateScript, IImbricateScriptManager, IMBRICATE_SCRIPT_MANAGER_CAPABILITY_KEY, ImbricateNotImplemented, ImbricateScriptManagerBase, ImbricateScriptManagerCapability, ImbricateScriptMetadata, ImbricateScriptQuery, ImbricateScriptQueryConfig, ImbricateScriptSearchResult, ImbricateScriptSnapshot, ImbricateSearchScriptConfig } from "@imbricate/core";
import { Connection } from "mongoose";
import { IScriptModel, ScriptModel } from "../database/script/model";
import { mongoCreateScript } from "../origin/create-script";
import { mongoPutScript } from "../origin/put-script";
import { MongoImbricateScript } from "../script/script";
import { mongoSearchScripts } from "../script/search-scripts";

export class MongoImbricateScriptManager extends ImbricateScriptManagerBase implements IImbricateScriptManager {

    public static create(
        connectFunction: () => Promise<Connection>,
    ): MongoImbricateScriptManager {

        return new MongoImbricateScriptManager(connectFunction);
    }

    private readonly _connectFunction: () => Promise<Connection>;

    private constructor(
        connectFunction: () => Promise<Connection>,
    ) {

        super();

        this._connectFunction = connectFunction;
    }

    public get capabilities(): ImbricateScriptManagerCapability {
        return ImbricateScriptManagerBase.allAllowCapability();
    }

    public async createScript(
        scriptName: string,
        initialScript: string,
        description?: string,
    ): Promise<IImbricateScript> {

        await this._connectFunction();
        return mongoCreateScript(
            scriptName,
            initialScript,
            description,
        );
    }

    public async hasScript(
        scriptName: string,
    ): Promise<boolean> {

        await this._connectFunction();
        const ifExist = await ScriptModel.exists({
            scriptName,
        });
        return Boolean(ifExist);
    }

    public async getScript(
        identifier: string,
    ): Promise<IImbricateScript | null> {

        await this._connectFunction();
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

        await this._connectFunction();
        return await mongoPutScript(
            scriptMetadata,
            script,
        );
    }

    public async renameScript(
        identifier: string,
        newScriptName: string,
    ): Promise<void> {

        await this._connectFunction();
        await ScriptModel.updateOne({
            identifier,
        }, {
            scriptName: newScriptName,
        });
    }

    public async listScripts(): Promise<ImbricateScriptSnapshot[]> {

        await this._connectFunction();
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

        await this._connectFunction();
        await ScriptModel.deleteOne({
            identifier,
        });
    }

    public async searchScripts(
        keyword: string,
        config: ImbricateSearchScriptConfig,
    ): Promise<ImbricateScriptSearchResult[]> {

        await this._connectFunction();
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
