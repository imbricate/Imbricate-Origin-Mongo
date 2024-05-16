/**
 * @author WMXPY
 * @namespace Collection
 * @description Create Page
 */

import { storeContent } from "../database/content/controller";
import { CONTENT_SOURCE_TYPE } from "../database/content/interface";
import { createUnsavedPage } from "../database/page/controller";
import { MongoImbricatePage } from "../page/page";
import { digestStringLong } from "../util/digest";

export const mongoCreatePage = async (
    collectionUniqueIdentifier: string,
    directories: string[],
    title: string,
    initialContent: string,
    description?: string,
): Promise<MongoImbricatePage> => {

    const newPage = createUnsavedPage(

        collectionUniqueIdentifier,
        directories,
        title,
        initialContent,
        description,
    );

    await newPage.save();

    const digest: string = digestStringLong(initialContent);
    await storeContent(
        CONTENT_SOURCE_TYPE.PAGE,
        digest,
        initialContent,
    );

    return MongoImbricatePage.withModel(newPage);
};
