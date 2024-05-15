/**
 * @author WMXPY
 * @namespace Origin
 * @description Origin
 */

import { IImbricateBinaryStorage, IImbricateCollection, IImbricateFunctionManager, IImbricateOrigin, IImbricateScript, IMBRICATE_DIGEST_ALGORITHM, IMBRICATE_ORIGIN_CAPABILITY_KEY, ImbricateNotImplemented, ImbricateOriginBase, ImbricateOriginCapability, ImbricateOriginMetadata, ImbricateScriptMetadata, ImbricateScriptQuery, ImbricateScriptQueryConfig, ImbricateScriptSearchResult, ImbricateScriptSnapshot, ImbricateSearchScriptConfig, SandboxExecuteConfig } from "@imbricate/core";
import { MarkedResult } from "@sudoo/marked";
import { Connection } from "mongoose";
import { MongoImbricateCollection } from "../collection/collection";
import { CollectionModel, ICollectionModel } from "../database/collection/model";
import { connectDatabase } from "../database/connect";
import { IScriptModel, ScriptModel } from "../database/script/model";
import { MongoImbricateScript } from "../script/script";
import { digestString } from "../util/digest";
import { mongoCreateCollection } from "./create-collection";
import { mongoCreateScript } from "./create-script";

export class MongoImbricateOrigin extends ImbricateOriginBase implements IImbricateOrigin {

    public static async create(
        databaseUrl: string,
    ): Promise<MongoImbricateOrigin> {

        const connection: Connection = await connectDatabase(databaseUrl);

        return new MongoImbricateOrigin(databaseUrl, connection);
    }

    private readonly _databaseUrl: string;

    public readonly originType: string = "mongo";
    public readonly capabilities: ImbricateOriginCapability =
        ImbricateOriginBase.allAllowCapability();

    public readonly metadata: ImbricateOriginMetadata = {
        digestAlgorithm: IMBRICATE_DIGEST_ALGORITHM.SHA1,
    };
    public readonly payloads: Record<string, any> = {};

    private readonly _connection: Connection;

    private constructor(
        databaseUrl: string,
        connection: Connection,
    ) {

        super();

        this._databaseUrl = databaseUrl;
        this._connection = connection;
    }

    public get uniqueIdentifier(): string {
        return digestString(this._databaseUrl);
    }

    public getFunctionManger(): IImbricateFunctionManager {

        throw new Error("Method not implemented.");
    }

    public getBinaryStorage(): IImbricateBinaryStorage {

        throw new Error("Method not implemented.");
    }

    public async createCollection(
        collectionName: string,
        description?: string,
    ): Promise<MongoImbricateCollection> {

        return await mongoCreateCollection(
            collectionName,
            description,
        );
    }

    public async hasCollection(collectionName: string): Promise<boolean> {

        const exists = await CollectionModel.exists({
            collectionName,
        });

        return Boolean(exists);
    }

    public async getCollection(
        collectionUniqueIdentifier: string,
    ): Promise<IImbricateCollection | null> {

        const collectionModel: ICollectionModel | null = await CollectionModel.findOne({
            uniqueIdentifier: collectionUniqueIdentifier,
        });

        if (!collectionModel) {
            return null;
        }
        return MongoImbricateCollection.withModel(collectionModel);
    }

    public async findCollection(
        collectionName: string,
    ): Promise<IImbricateCollection | null> {

        const collectionModel: ICollectionModel | null = await CollectionModel.findOne({
            collectionName,
        });

        if (!collectionModel) {
            return null;
        }
        return MongoImbricateCollection.withModel(collectionModel);
    }

    public async renameCollection(
        collectionUniqueIdentifier: string,
        newCollectionName: string,
    ): Promise<void> {

        await CollectionModel.updateOne({
            uniqueIdentifier: collectionUniqueIdentifier,
        }, {
            collectionName: newCollectionName,
        });
        return;
    }

    public async listCollections(): Promise<IImbricateCollection[]> {

        const collectionModels = await CollectionModel.find({});
        return collectionModels.map((model: ICollectionModel) => {
            return MongoImbricateCollection.withModel(model);
        });
    }

    public async deleteCollection(
        collectionUniqueIdentifier: string,
    ): Promise<void> {

        await CollectionModel.deleteOne({
            uniqueIdentifier: collectionUniqueIdentifier,
        });
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
        _scriptMetadata: ImbricateScriptMetadata,
        _script: string,
    ): Promise<IImbricateScript> {

        throw ImbricateNotImplemented.create(
            "putScript",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.PUT_SCRIPT,
        );
    }

    public async renameScript(
        _identifier: string,
        _newScriptName: string,
    ): Promise<void> {

        throw ImbricateNotImplemented.create(
            "renameScript",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.RENAME_SCRIPT,
        );
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
        _keyword: string,
        _config: ImbricateSearchScriptConfig,
    ): Promise<ImbricateScriptSearchResult[]> {

        throw ImbricateNotImplemented.create(
            "searchScripts",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.GET_SCRIPT,
        );
    }

    public async queryScripts(
        _query: ImbricateScriptQuery,
        _config: ImbricateScriptQueryConfig,
    ): Promise<IImbricateScript[]> {

        throw ImbricateNotImplemented.create(
            "queryScripts",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.GET_SCRIPT,
        );
    }

    public async executeScript(
        _scriptIdentifier: string,
        _config: SandboxExecuteConfig,
    ): Promise<MarkedResult | null> {

        throw ImbricateNotImplemented.create(
            "executeScript",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.GET_SCRIPT,
        );
    }

    public async dispose(): Promise<void> {

        await this._connection.close();
    }
}
