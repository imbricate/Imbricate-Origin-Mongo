/**
 * @author WMXPY
 * @namespace Database_Page
 * @description Controller
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { digestString } from "../../util/digest";
import { IPageConfig } from "./interface";
import { IPageModel, PageModel } from "./model";

export const createUnsavedPage = (
    title: string,
    directories: string[],
    initialContent: string,
    description?: string,
): IPageModel => {

    const identifier: string = UUIDVersion1.generateString();
    const contentDigest: string = digestString(initialContent);

    const accountConfig: IPageConfig = {

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

    return new PageModel(accountConfig);
};
