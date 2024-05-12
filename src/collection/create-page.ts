/**
 * @author WMXPY
 * @namespace Collection
 * @description Create Page
 */

import { storeContent } from "../database/content/controller";
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
    await storeContent(digest, initialContent);

    return MongoImbricatePage.withModel(newPage);
};
