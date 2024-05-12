/**
 * @author WMXPY
 * @namespace Collection
 * @description Collection
 */

import { IImbricateOriginCollection, IImbricatePage, ImbricateCollectionCapability, ImbricatePageMetadata, ImbricatePageQuery, ImbricatePageQueryConfig, ImbricatePageSearchResult, ImbricatePageSnapshot, ImbricateSearchPageConfig, createAllAllowImbricateCollectionCapability } from "@imbricate/core";
import { ICollectionModel } from "../database/collection/model";
import { PageModel } from "../database/page/model";
import { MongoImbricatePage } from "../page/page";
import { mongoCreatePage } from "./create-page";

export class MongoImbricateCollection implements IImbricateOriginCollection {

    public static withModel(collection: ICollectionModel): MongoImbricateCollection {

        return new MongoImbricateCollection(collection);
    }

    private readonly _collection: ICollectionModel;

    public readonly capabilities: ImbricateCollectionCapability = createAllAllowImbricateCollectionCapability();

    private constructor(collection: ICollectionModel) {

        this._collection = collection;
    }

    public get collectionName(): string {
        return this._collection.collectionName;
    }
    public get uniqueIdentifier(): string {
        return this._collection.uniqueIdentifier;
    }
    public get description(): string | undefined {
        return this._collection.description;
    }

    public async createPage(
        directories: string[],
        title: string,
        initialContent: string,
    ): Promise<IImbricatePage> {

        return await mongoCreatePage(
            this._collection.uniqueIdentifier,
            directories,
            title,
            initialContent,
            this._collection.description,
        );
    }

    public async putPage(
        _pageMetadata: ImbricatePageMetadata,
        _content: string,
    ): Promise<IImbricatePage> {

        throw new Error("Method not implemented.");
    }

    public async retitlePage(
        _identifier: string,
        _newTitle: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public async deletePage(
        identifier: string,
    ): Promise<void> {

        await PageModel.deleteOne({
            collectionUniqueIdentifier: this._collection.uniqueIdentifier,
            identifier,
        });
    }

    public async hasPage(
        _directories: string[],
        _title: string,
    ): Promise<boolean> {

        throw new Error("Method not implemented.");
    }

    public async getPage(
        identifier: string,
    ): Promise<IImbricatePage | null> {

        const page = await PageModel.findOne({
            collectionUniqueIdentifier: this._collection.uniqueIdentifier,
            identifier,
        });

        if (!page) {
            return null;
        }
        return MongoImbricatePage.withModel(page);
    }

    public async listPages(
        _directories: string[],
        _recursive: boolean,
    ): Promise<ImbricatePageSnapshot[]> {

        throw new Error("Method not implemented.");
    }

    public async listDirectories(
        _directories: string[],
    ): Promise<string[]> {

        throw new Error("Method not implemented.");
    }

    public async searchPages(
        _keyword: string,
        _config: ImbricateSearchPageConfig,
    ): Promise<ImbricatePageSearchResult[]> {

        throw new Error("Method not implemented.");
    }

    public async queryPages(
        _query: ImbricatePageQuery,
        _config: ImbricatePageQueryConfig,
    ): Promise<IImbricatePage[]> {

        throw new Error("Method not implemented.");
    }
}
