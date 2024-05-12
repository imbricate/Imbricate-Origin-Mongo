/**
 * @author WMXPY
 * @namespace Collection
 * @description Collection
 */

import { IImbricateOriginCollection, IImbricatePage, ImbricateCollectionCapability, ImbricatePageMetadata, ImbricatePageQuery, ImbricatePageQueryConfig, ImbricatePageSearchResult, ImbricatePageSnapshot, ImbricateSearchPageConfig, createAllAllowImbricateCollectionCapability } from "@imbricate/core";
import { ICollectionModel } from "../database/collection/model";

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

    createPage(
        _directories: string[],
        _title: string,
        _initialContent: string,
    ): Promise<IImbricatePage> {

        throw new Error("Method not implemented.");
    }

    putPage(
        _pageMetadata: ImbricatePageMetadata,
        _content: string,
    ): Promise<IImbricatePage> {

        throw new Error("Method not implemented.");
    }

    retitlePage(
        _identifier: string,
        _newTitle: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    deletePage(
        _identifier: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    hasPage(
        _directories: string[],
        _title: string,
    ): Promise<boolean> {

        throw new Error("Method not implemented.");
    }

    getPage(
        _identifier: string,
    ): Promise<IImbricatePage | null> {

        throw new Error("Method not implemented.");
    }

    listPages(
        _directories: string[],
        _recursive: boolean,
    ): Promise<ImbricatePageSnapshot[]> {

        throw new Error("Method not implemented.");
    }

    listDirectories(
        _directories: string[],
    ): Promise<string[]> {

        throw new Error("Method not implemented.");
    }

    searchPages(
        _keyword: string,
        _config: ImbricateSearchPageConfig,
    ): Promise<ImbricatePageSearchResult[]> {

        throw new Error("Method not implemented.");
    }

    queryPages(
        _query: ImbricatePageQuery,
        _config: ImbricatePageQueryConfig,
    ): Promise<IImbricatePage[]> {

        throw new Error("Method not implemented.");
    }
}
