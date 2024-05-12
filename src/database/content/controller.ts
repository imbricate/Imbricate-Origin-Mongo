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

export const storeContent = async (
    digest: string,
    content: string,
): Promise<IContentModel> => {

    const existingContent: IContentModel | null =
        await ContentModel.findOne({ digest });

    if (existingContent) {
        return existingContent;
    }
    const newContent: IContentModel = createUnsavedContent(digest, content);
    await newContent.save();

    return newContent;
};
