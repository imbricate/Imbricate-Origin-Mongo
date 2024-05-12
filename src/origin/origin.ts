/**
 * @author WMXPY
 * @namespace Origin
 * @description Origin
 */

import { IImbricateBinaryStorage, IImbricateFunctionManager, IImbricateOrigin, IImbricateOriginCollection, IImbricateScript, IMBRICATE_DIGEST_ALGORITHM, IMBRICATE_ORIGIN_CAPABILITY_KEY, ImbricateNoteImplemented, ImbricateOriginCapability, ImbricateOriginMetadata, ImbricateScriptMetadata, ImbricateScriptQuery, ImbricateScriptQueryConfig, ImbricateScriptSearchResult, ImbricateSearchScriptConfig, SandboxExecuteConfig, createAllAllowImbricateOriginCapability } from "@imbricate/core";
import { MarkedResult } from "@sudoo/marked";
import { connectDatabase } from "../database/connect";
import { mongoCreateCollection } from "./create-collection";
import { mongoHasCollection } from "./has-collection";

export class MongoImbricateOrigin implements IImbricateOrigin {

    public static async create(
        database: string,
    ): Promise<MongoImbricateOrigin> {

        await connectDatabase(database);

        return new MongoImbricateOrigin();
    }

    public readonly originType: string = "mongo";
    public readonly capabilities: ImbricateOriginCapability =
        createAllAllowImbricateOriginCapability();

    public readonly metadata: ImbricateOriginMetadata = {
        digestAlgorithm: IMBRICATE_DIGEST_ALGORITHM.SHA1,
    };
    public readonly payloads: Record<string, any> = {};

    private constructor() {

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
    ): Promise<void> {

        return await mongoCreateCollection(
            collectionName,
            description,
        );
    }

    public async hasCollection(collectionName: string): Promise<boolean> {

        return await mongoHasCollection(collectionName);
    }

    public async getCollection(
        _collectionUniqueIdentifier: string,
    ): Promise<IImbricateOriginCollection | null> {

        throw ImbricateNoteImplemented.create(
            "getCollection",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.GET_COLLECTION,
        );
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

        throw ImbricateNoteImplemented.create(
            "listCollections",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.LIST_COLLECTIONS,
        );
    }

    public async deleteCollection(): Promise<void> {

        throw ImbricateNoteImplemented.create(
            "removeCollection",
            IMBRICATE_ORIGIN_CAPABILITY_KEY.DELETE_COLLECTION,
        );
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
}
