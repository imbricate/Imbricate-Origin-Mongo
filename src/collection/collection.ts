/**
 * @author WMXPY
 * @namespace Collection
 * @description Collection
 */

import { IImbricateOriginCollection, IImbricatePage, ImbricateCollectionCapability, ImbricatePageMetadata, ImbricatePageQuery, ImbricatePageQueryConfig, ImbricatePageSearchResult, ImbricatePageSnapshot, ImbricateSearchPageConfig, PromiseOr } from "@imbricate/core";

export class MongoImbricateCollection implements IImbricateOriginCollection {

    collectionName: string;
    uniqueIdentifier: string;

    description?: string | undefined;
    capabilities: ImbricateCollectionCapability;

    createPage(
        directories: string[],
        title: string,
        initialContent: string,
    ): Promise<IImbricatePage> {

        throw new Error("Method not implemented.");
    }

    putPage(
        pageMetadata: ImbricatePageMetadata,
        content: string,
    ): Promise<IImbricatePage> {

        throw new Error("Method not implemented.");
    }

    retitlePage(
        identifier: string,
        newTitle: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    deletePage(
        identifier: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    hasPage(
        directories: string[],
        title: string,
    ): Promise<boolean> {

        throw new Error("Method not implemented.");
    }

    getPage(
        identifier: string,
    ): Promise<IImbricatePage | null> {

        throw new Error("Method not implemented.");
    }

    listPages(
        directories: string[],
        recursive: boolean,
    ): Promise<ImbricatePageSnapshot[]> {

        throw new Error("Method not implemented.");
    }

    listDirectories(
        directories: string[],
    ): Promise<string[]> {

        throw new Error("Method not implemented.");
    }

    searchPages(
        keyword: string,
        config: ImbricateSearchPageConfig,
    ): Promise<ImbricatePageSearchResult[]> {

        throw new Error("Method not implemented.");
    }

    queryPages(
        query: ImbricatePageQuery,
        config: ImbricatePageQueryConfig,
    ): Promise<IImbricatePage[]> {

        throw new Error("Method not implemented.");
    }
}
