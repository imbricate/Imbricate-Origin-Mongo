/**
 * @author WMXPY
 * @namespace Database_Content
 * @description Controller
 */

import { CONTENT_SOURCE_TYPE, IContentConfig } from "./interface";
import { ContentModel, IContentModel } from "./model";

export const createUnsavedContent = (
    sourceType: CONTENT_SOURCE_TYPE,
    digest: string,
    content: string,
): IContentModel => {

    const contentConfig: IContentConfig = {

        sourceType,
        digest,
        content,
    };
    return new ContentModel(contentConfig);
};

export const storeContent = async (
    sourceType: CONTENT_SOURCE_TYPE,
    digest: string,
    content: string,
): Promise<IContentModel> => {

    const existingContent: IContentModel | null =
        await ContentModel.findOne({ digest });

    if (existingContent) {
        return existingContent;
    }
    const newContent: IContentModel = createUnsavedContent(
        sourceType,
        digest,
        content,
    );
    await newContent.save();

    return newContent;
};
