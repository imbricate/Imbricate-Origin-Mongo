/**
 * @author WMXPY
 * @namespace Collection
 * @description Put Page
 */

import { ImbricatePageMetadata } from "@imbricate/core";
import { storeContent } from "../database/content/controller";
import { IPageConfig } from "../database/page/interface";
import { PageModel } from "../database/page/model";
import { MongoImbricatePage } from "../page/page";
import { digestStringLong } from "../util/digest";

export const mongoPutPage = async (
    collectionUniqueIdentifier: string,
    pageMetadata: ImbricatePageMetadata,
    pageContent: string,
): Promise<MongoImbricatePage> => {

    const pageDigest: string = digestStringLong(pageContent);

    const pageConfig: IPageConfig = {

        collectionUniqueIdentifier,

        directories: pageMetadata.directories,
        title: pageMetadata.title,
        description: pageMetadata.description,

        identifier: pageMetadata.identifier,

        imbricateDigest: pageMetadata.digest,
        contentDigest: pageDigest,

        attributes: pageMetadata.attributes,
        historyRecords: pageMetadata.historyRecords,

        imbricateUpdatedAt: pageMetadata.updatedAt,
    };

    const pageModel = new PageModel(pageConfig);

    await storeContent(pageDigest, pageContent);
    await pageModel.save();

    return MongoImbricatePage.withModel(pageModel);
};
