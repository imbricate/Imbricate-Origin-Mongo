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
    createPage(directories: string[], title: string, initialContent: string): PromiseOr<IImbricatePage> {
        throw new Error("Method not implemented.");
    }
    putPage(pageMetadata: ImbricatePageMetadata, content: string): PromiseOr<IImbricatePage> {
        throw new Error("Method not implemented.");
    }
    retitlePage(identifier: string, newTitle: string): PromiseOr<void> {
        throw new Error("Method not implemented.");
    }
    deletePage(identifier: string): PromiseOr<void> {
        throw new Error("Method not implemented.");
    }
    hasPage(directories: string[], title: string): PromiseOr<boolean> {
        throw new Error("Method not implemented.");
    }
    getPage(identifier: string): PromiseOr<IImbricatePage | null> {
        throw new Error("Method not implemented.");
    }
    listPages(directories: string[], recursive: boolean): PromiseOr<ImbricatePageSnapshot[]> {
        throw new Error("Method not implemented.");
    }
    listDirectories(directories: string[]): PromiseOr<string[]> {
        throw new Error("Method not implemented.");
    }
    searchPages(keyword: string, config: ImbricateSearchPageConfig): PromiseOr<ImbricatePageSearchResult[]> {
        throw new Error("Method not implemented.");
    }
    queryPages(query: ImbricatePageQuery, config: ImbricatePageQueryConfig): PromiseOr<IImbricatePage[]> {
        throw new Error("Method not implemented.");
    }

}
