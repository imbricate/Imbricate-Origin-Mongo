/**
 * @author WMXPY
 * @namespace Origin
 * @description Origin
 */

import { IImbricateBinaryStorage, IImbricateCollection, IImbricateFunctionManager, IImbricateOrigin, IImbricateScript, IMBRICATE_DIGEST_ALGORITHM, IMBRICATE_ORIGIN_CAPABILITY_KEY, ImbricateNotImplemented, ImbricateOriginBase, ImbricateOriginCapability, ImbricateOriginMetadata, ImbricateScriptMetadata, ImbricateScriptQuery, ImbricateScriptQueryConfig, ImbricateScriptSearchResult, ImbricateScriptSnapshot, ImbricateSearchScriptConfig } from "@imbricate/core";
import { Connection } from "mongoose";
import { MongoImbricateCollection } from "../collection/collection";
import { CollectionModel, ICollectionModel } from "../database/collection/model";
import { connectDatabase } from "../database/connect";
import { IScriptModel, ScriptModel } from "../database/script/model";
import { MongoImbricateScript } from "../script/script";
import { mongoSearchScripts } from "../script/search-scripts";
import { digestString } from "../util/digest";
import { mongoCreateCollection } from "./create-collection";
import { mongoCreateScript } from "./create-script";
import { mongoPutScript } from "./put-script";

export class MongoImbricateOrigin extends ImbricateOriginBase implements IImbricateOrigin {

    public static create(
        databaseUrl: string,
    ): MongoImbricateOrigin {

        return new MongoImbricateOrigin(databaseUrl);
    }

    private readonly _databaseUrl: string;

    public readonly originType: string = "mongo";
    public readonly capabilities: ImbricateOriginCapability =
        ImbricateOriginBase.allAllowCapability();

    public readonly metadata: ImbricateOriginMetadata = {
        digestAlgorithm: IMBRICATE_DIGEST_ALGORITHM.SHA1,
    };
    public readonly payloads: Record<string, any> = {};

    private _connection: Connection | null;

    private constructor(
        databaseUrl: string,
    ) {

        super();

        this._databaseUrl = databaseUrl;
        this._connection = null;
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

        await this._connect();
        return await mongoCreateCollection(
            collectionName,
            description,
        );
    }

    public async hasCollection(collectionName: string): Promise<boolean> {

        await this._connect();
        const exists = await CollectionModel.exists({
            collectionName,
        });

        return Boolean(exists);
    }

    public async getCollection(
        collectionUniqueIdentifier: string,
    ): Promise<IImbricateCollection | null> {

        await this._connect();
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

        await this._connect();
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

        await this._connect();
        await CollectionModel.updateOne({
            uniqueIdentifier: collectionUniqueIdentifier,
        }, {
            collectionName: newCollectionName,
        });
        return;
    }

    public async listCollections(): Promise<IImbricateCollection[]> {

        await this._connect();
        const collectionModels = await CollectionModel.find({});
        return collectionModels.map((model: ICollectionModel) => {
            return MongoImbricateCollection.withModel(model);
        });
    }

    public async deleteCollection(
        collectionUniqueIdentifier: string,
    ): Promise<void> {

        await this._connect();
        await CollectionModel.deleteOne({
            uniqueIdentifier: collectionUniqueIdentifier,
        });
    }

    public async createScript(
        scriptName: string,
        initialScript: string,
        description?: string,
    ): Promise<IImbricateScript> {

        await this._connect();
        return mongoCreateScript(
            scriptName,
            initialScript,
            description,
        );
    }

    public async hasScript(
        scriptName: string,
    ): Promise<boolean> {

        await this._connect();
        const ifExist = await ScriptModel.exists({
            scriptName,
        });
        return Boolean(ifExist);
    }

    public async getScript(
        identifier: string,
    ): Promise<IImbricateScript | null> {

        await this._connect();
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

        await this._connect();
        return await mongoPutScript(
            scriptMetadata,
            script,
        );
    }

    public async renameScript(
        identifier: string,
        newScriptName: string,
    ): Promise<void> {

        await this._connect();
        await ScriptModel.updateOne({
            identifier,
        }, {
            scriptName: newScriptName,
        });
    }

    public async listScripts(): Promise<ImbricateScriptSnapshot[]> {

        await this._connect();
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

        await this._connect();
        await ScriptModel.deleteOne({
            identifier,
        });
    }

    public async searchScripts(
        keyword: string,
        config: ImbricateSearchScriptConfig,
    ): Promise<ImbricateScriptSearchResult[]> {

        await this._connect();
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
            IMBRICATE_ORIGIN_CAPABILITY_KEY.GET_SCRIPT,
        );
    }

    public async dispose(): Promise<void> {

        if (!this._connection) {
            return;
        }

        await this._connection.close();
    }

    private async _connect(): Promise<Connection> {

        if (this._connection) {
            return this._connection;
        }

        const connection: Connection = await connectDatabase(this._databaseUrl);
        this._connection = connection;
        return connection;
    }
}
