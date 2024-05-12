/**
 * @author WMXPY
 * @namespace Database_Content
 * @description Controller
 */

import { IContentConfig } from "./interface";
import { ContentModel, IContentModel } from "./model";

export const createUnsavedContent = (
    digest: string,
    content: string,
): IContentModel => {

    const contentConfig: IContentConfig = {

        digest,
        content,
    };
    return new ContentModel(contentConfig);
};
