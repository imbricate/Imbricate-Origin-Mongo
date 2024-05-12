/**
 * @author WMXPY
 * @namespace Origin
 * @description Origin
 */

import { IImbricateBinaryStorage, IImbricateFunctionManager, IImbricateOrigin, IImbricateOriginCollection, IImbricateScript, IMBRICATE_DIGEST_ALGORITHM, IMBRICATE_ORIGIN_CAPABILITY_KEY, ImbricateNoteImplemented, ImbricateOriginCapability, ImbricateOriginMetadata, ImbricateScriptMetadata, ImbricateScriptQuery, ImbricateScriptQueryConfig, ImbricateScriptSearchResult, ImbricateSearchScriptConfig, SandboxExecuteConfig, createAllAllowImbricateOriginCapability } from "@imbricate/core";
import { MarkedResult } from "@sudoo/marked";
import { Connection } from "mongoose";
import { MongoImbricateCollection } from "../collection/collection";
import { CollectionModel, ICollectionModel } from "../database/collection/model";
import { connectDatabase } from "../database/connect";
import { mongoCreateCollection } from "./create-collection";

export class MongoImbricateOrigin implements IImbricateOrigin {

    public static async create(
        database: string,
    ): Promise<MongoImbricateOrigin> {

        const connection: Connection = await connectDatabase(database);

        return new MongoImbricateOrigin(connection);
    }

    public readonly originType: string = "mongo";
    public readonly capabilities: ImbricateOriginCapability =
        createAllAllowImbricateOriginCapability();

    public readonly metadata: ImbricateOriginMetadata = {
        digestAlgorithm: IMBRICATE_DIGEST_ALGORITHM.SHA1,
    };
    public readonly payloads: Record<string, any> = {};

    private readonly _connection: Connection;

    private constructor(
        connection: Connection,
    ) {

        this._connection = connection;
    }

    public get uniqueIdentifier(): string {
        return "Mongo";
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
    ): Promise<IImbricateOriginCollection | null> {

        const collectionModel: ICollectionModel | null = await CollectionModel.findOne({
            uniqueIdentifier: collectionUniqueIdentifier,
        });

        if (!collectionModel) {
            return null;
        }
        return MongoImbricateCollection.withModel(collectionModel);
    }

    public async findCollection(
        _collectionName: string,
    ): Promise<IImbricateOriginCollection | null> {

        throw ImbricateNoteImplemented.create(
            "findCollection",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.GET_COLLECTION,
        );
    }

    public async renameCollection(
        _collectionUniqueIdentifier: string,
        _newCollectionName: string,
    ): Promise<void> {

        throw ImbricateNoteImplemented.create(
            "renameCollection",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.RENAME_COLLECTION,
        );
    }

    public async listCollections(): Promise<IImbricateOriginCollection[]> {

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
        _scriptName: string,
        _description?: string,
    ): Promise<IImbricateScript> {

        throw ImbricateNoteImplemented.create(
            "createScript",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.CREATE_SCRIPT,
        );
    }

    public async hasScript(
        _scriptName: string,
    ): Promise<boolean> {

        throw ImbricateNoteImplemented.create(
            "hasScript",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.GET_SCRIPT,
        );
    }

    public async getScript(
        _scriptName: string,
    ): Promise<IImbricateScript | null> {

        throw ImbricateNoteImplemented.create(
            "getScript",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.GET_SCRIPT,
        );
    }

    public async openScript(
        _scriptIdentifier: string,
    ): Promise<string> {

        throw ImbricateNoteImplemented.create(
            "openScript",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.GET_SCRIPT,
        );
    }

    public async putScript(
        _scriptMetadata: ImbricateScriptMetadata,
        _script: string,
    ): Promise<IImbricateScript> {

        throw ImbricateNoteImplemented.create(
            "putScript",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.PUT_SCRIPT,
        );
    }

    public async renameScript(
        _identifier: string,
        _newScriptName: string,
    ): Promise<void> {

        throw ImbricateNoteImplemented.create(
            "renameScript",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.RENAME_SCRIPT,
        );
    }

    public async listScripts(): Promise<ImbricateScriptMetadata[]> {

        throw ImbricateNoteImplemented.create(
            "listScripts",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.LIST_SCRIPTS,
        );
    }

    public async deleteScript(
        _scriptName: string,
    ): Promise<void> {

        throw ImbricateNoteImplemented.create(
            "removeScript",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.DELETE_SCRIPT,
        );
    }

    public async searchScripts(
        _keyword: string,
        _config: ImbricateSearchScriptConfig,
    ): Promise<ImbricateScriptSearchResult[]> {

        throw ImbricateNoteImplemented.create(
            "searchScripts",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.GET_SCRIPT,
        );
    }

    public async queryScripts(
        _query: ImbricateScriptQuery,
        _config: ImbricateScriptQueryConfig,
    ): Promise<IImbricateScript[]> {

        throw ImbricateNoteImplemented.create(
            "queryScripts",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.GET_SCRIPT,
        );
    }

    public async executeScript(
        _scriptIdentifier: string,
        _config: SandboxExecuteConfig,
    ): Promise<MarkedResult | null> {

        throw ImbricateNoteImplemented.create(
            "executeScript",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.GET_SCRIPT,
        );
    }

    public async dispose(): Promise<void> {

        await this._connection.close();
    }
}
