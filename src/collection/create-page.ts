/**
 * @author WMXPY
 * @namespace Collection
 * @description Create Page
 */

import { storeContent } from "../database/content/controller";
import { createUnsavedPage } from "../database/page/controller";
import { MongoImbricatePage } from "../page/page";

export const mongoCreatePage = async (
    directories: string[],
    title: string,
    initialContent: string,
    description?: string,
): Promise<MongoImbricatePage> => {

    const newPage = createUnsavedPage(
        directories,
        title,
        initialContent,
        description,
    );

    await newPage.save();
    await storeContent(initialContent);

    return MongoImbricatePage.withModel(newPage);
};
