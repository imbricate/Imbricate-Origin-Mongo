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
    directories: string[],
    title: string,
    initialContent: string,
    description?: string,
): IPageModel => {

    const identifier: string = UUIDVersion1.generateString();
    const contentDigest: string = digestStringLong(initialContent);

    const pageConfig: IPageConfig = {

        title,
        description,

        directories,
        identifier,

        digest: contentDigest,

        historyRecords: [{
            updatedAt: new Date(),
            digest: contentDigest,
        }],
    };
    return new PageModel(pageConfig);
};
