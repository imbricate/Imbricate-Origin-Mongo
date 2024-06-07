/**
 * @author WMXPY
 * @namespace Origin
 * @description Origin
 */

import { IImbricateBinaryStorage, IImbricateCollection, IImbricateFunctionManager, IImbricateOrigin, IImbricateScriptManager, IMBRICATE_DIGEST_ALGORITHM, ImbricateOriginBase, ImbricateOriginCapability, ImbricateOriginMetadata } from "@imbricate/core";
import { Connection } from "mongoose";
import { MongoImbricateCollection } from "../collection/collection";
import { CollectionModel, ICollectionModel } from "../database/collection/model";
import { connectDatabase } from "../database/connect";
import { MongoImbricateScriptManager } from "../script-manager/script-manager";
import { debugLog } from "../util/debug";
import { digestString } from "../util/digest";
import { mongoCreateCollection } from "./create-collection";

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

    public async getScriptManager(): Promise<IImbricateScriptManager> {

        await this._connect();
        return MongoImbricateScriptManager.create();
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


    public async dispose(): Promise<void> {

        if (!this._connection) {

            debugLog("No connection to dispose", this.uniqueIdentifier);
            return;
        }

        debugLog("Closing mongo database", this.uniqueIdentifier);

        await this._connection.close();
    }

    private async _connect(): Promise<Connection> {

        if (this._connection) {
            return this._connection;
        }

        debugLog("Connecting to mongo database", this.uniqueIdentifier);

        const connection: Connection = await connectDatabase(this._databaseUrl);
        this._connection = connection;

        return connection;
    }
}
