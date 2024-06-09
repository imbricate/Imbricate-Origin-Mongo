/**
 * @author WMXPY
 * @namespace Mongo_CollectionManager
 * @description Collection Manager
 */

import { IImbricateCollection, IImbricateCollectionManager, ImbricateCollectionManagerBase, ImbricateCollectionManagerCapability } from "@imbricate/core";
import { Connection } from "mongoose";
import { MongoImbricateCollection } from "../collection/collection";
import { CollectionModel, ICollectionModel } from "../database/collection/model";
import { mongoCreateCollection } from "../origin/create-collection";

export class MongoImbricateCollectionManager extends ImbricateCollectionManagerBase implements IImbricateCollectionManager {

    public static create(
        connectFunction: () => Promise<Connection>,
    ): MongoImbricateCollectionManager {

        return new MongoImbricateCollectionManager(connectFunction);
    }

    private readonly _connectFunction: () => Promise<Connection>;

    private constructor(
        connectFunction: () => Promise<Connection>,
    ) {

        super();

        this._connectFunction = connectFunction;
    }

    public get capabilities(): ImbricateCollectionManagerCapability {
        return ImbricateCollectionManagerBase.allAllowCapability();
    }

    public async createCollection(
        collectionName: string,
        description?: string,
    ): Promise<MongoImbricateCollection> {

        await this._connectFunction();
        return await mongoCreateCollection(
            collectionName,
            description,
        );
    }

    public async hasCollection(collectionName: string): Promise<boolean> {

        await this._connectFunction();
        const exists = await CollectionModel.exists({
            collectionName,
        });

        return Boolean(exists);
    }

    public async getCollection(
        collectionUniqueIdentifier: string,
    ): Promise<IImbricateCollection | null> {

        await this._connectFunction();
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

        await this._connectFunction();
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

        await this._connectFunction();
        await CollectionModel.updateOne({
            uniqueIdentifier: collectionUniqueIdentifier,
        }, {
            collectionName: newCollectionName,
        });
        return;
    }

    public async listCollections(): Promise<IImbricateCollection[]> {

        await this._connectFunction();

        const collectionModels = await CollectionModel.find({});
        return collectionModels.map((model: ICollectionModel) => {
            return MongoImbricateCollection.withModel(model);
        });
    }

    public async deleteCollection(
        collectionUniqueIdentifier: string,
    ): Promise<void> {

        await this._connectFunction();
        await CollectionModel.deleteOne({
            uniqueIdentifier: collectionUniqueIdentifier,
        });
    }
}
