/**
 * @author WMXPY
 * @namespace Database_Page
 * @description Controller
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { digestStringLong } from "../../util/digest";
import { IPageConfig } from "./interface";
import { IPageModel, PageModel } from "./model";

export const createUnsavedPage = (
    collectionUniqueIdentifier: string,
    directories: string[],
    title: string,
    initialContent: string,
    description?: string,
): IPageModel => {

    const identifier: string = UUIDVersion1.generateString();
    const contentDigest: string = digestStringLong(initialContent);

    const current: Date = new Date();

    const pageConfig: IPageConfig = {

        collectionUniqueIdentifier,

        title,
        description,

        directories,
        identifier,

        digest: contentDigest,
        contentDigest,

        historyRecords: [{
            updatedAt: current,
            digest: contentDigest,
        }],
        contentUpdatedAt: current,
    };
    return new PageModel(pageConfig);
};
