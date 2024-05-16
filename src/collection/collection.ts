/**
 * @author WMXPY
 * @namespace Collection
 * @description Collection
 */

import { IImbricateCollection, IImbricatePage, ImbricateCollectionBase, ImbricateCollectionCapability, ImbricatePageMetadata, ImbricatePageQuery, ImbricatePageQueryConfig, ImbricatePageSearchResult, ImbricatePageSnapshot, ImbricateSearchPageConfig } from "@imbricate/core";
import { FilterQuery } from "mongoose";
import { ICollectionModel } from "../database/collection/model";
import { IPageModel, PageModel } from "../database/page/model";
import { MongoImbricatePage } from "../page/page";
import { mongoSearchPages } from "../page/search-pages";
import { mongoCreatePage } from "./create-page";
import { mongoPutPage } from "./put-page";

export class MongoImbricateCollection extends ImbricateCollectionBase implements IImbricateCollection {

    public static withModel(collection: ICollectionModel): MongoImbricateCollection {

        return new MongoImbricateCollection(collection);
    }

    private readonly _collection: ICollectionModel;

    public readonly capabilities: ImbricateCollectionCapability = ImbricateCollectionBase.allAllowCapability();

    private constructor(
        collection: ICollectionModel,
    ) {

        super();
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
        pageMetadata: ImbricatePageMetadata,
        content: string,
    ): Promise<IImbricatePage> {

        return await mongoPutPage(
            this._collection.uniqueIdentifier,
            pageMetadata,
            content,
        );
    }

    public async retitlePage(
        identifier: string,
        newTitle: string,
    ): Promise<void> {

        await PageModel.updateOne({
            collectionUniqueIdentifier: this._collection.uniqueIdentifier,
            identifier,
        }, {
            title: newTitle,
        });
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
        directories: string[],
        title: string,
    ): Promise<boolean> {

        const ifExist = await PageModel.exists({
            collectionUniqueIdentifier: this._collection.uniqueIdentifier,
            directories,
            title,
        });
        return Boolean(ifExist);
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
        directories: string[],
        recursive: boolean,
    ): Promise<ImbricatePageSnapshot[]> {

        const findTarget: FilterQuery<IPageModel> = {
            collectionUniqueIdentifier: this._collection.uniqueIdentifier,
        };

        if (recursive) {

            for (let i = 0; i < directories.length; i++) {
                findTarget[`directories.${i}`] = directories[i];
            }
        } else {
            findTarget.directories = directories;
        }

        const pages = await PageModel.find(findTarget);

        return pages.map((page: any) => {
            return {
                identifier: page.identifier,
                title: page.title,
                directories: page.directories,
            };
        });
    }

    public async listDirectories(
        directories: string[],
    ): Promise<string[]> {

        const findTarget: FilterQuery<IPageModel> = {
            collectionUniqueIdentifier: this._collection.uniqueIdentifier,
        };

        for (let i = 0; i < directories.length; i++) {
            findTarget[`directories.${i}`] = directories[i];
        }

        findTarget[`directories.${directories.length}`] = {
            $exists: true,
        };

        findTarget[`directories.${directories.length + 1}`] = {
            $exists: false,
        };

        const pages = await PageModel.find(findTarget);

        const directoriesSet: Set<string> = new Set();
        for (const page of pages) {
            if (page.directories.length > directories.length) {
                directoriesSet.add(page.directories[directories.length]);
            }
        }

        return Array.from(directoriesSet);
    }

    public async searchPages(
        keyword: string,
        config: ImbricateSearchPageConfig,
    ): Promise<ImbricatePageSearchResult[]> {

        return await mongoSearchPages(
            keyword,
            config,
        );
    }

    public async queryPages(
        _query: ImbricatePageQuery,
        _config: ImbricatePageQueryConfig,
    ): Promise<IImbricatePage[]> {

        throw new Error("Method not implemented.");
    }
}
