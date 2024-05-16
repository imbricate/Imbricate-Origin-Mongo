/**
 * @author WMXPY
 * @namespace Page
 * @description Search Pages
 */

import { IMBRICATE_SEARCH_RESULT_TYPE, IMBRICATE_SEARCH_SNIPPET_PAGE_SNIPPET_SOURCE, ImbricatePageSearchResult, ImbricateSearchPageConfig } from "@imbricate/core";
import { IPageModel, PageModel } from "../database/page/model";

export const mongoSearchPages = async (
    keyword: string,
    config: ImbricateSearchPageConfig,
): Promise<ImbricatePageSearchResult[]> => {

    const pages: IPageModel[] = await PageModel.find({
        title: {
            $regex: new RegExp(keyword, "i"),
        },
    }, {}, {
        limit: config.limit,
    });

    return pages.map((page: IPageModel): ImbricatePageSearchResult => {

        let titleIndex: number;
        if (config.exact) {
            titleIndex = page.title.indexOf(keyword);
        } else {
            titleIndex = page.title.search(new RegExp(keyword, "i"));
        }

        return {
            type: IMBRICATE_SEARCH_RESULT_TYPE.PAGE,
            scope: page.collectionUniqueIdentifier,
            identifier: page.identifier,
            headline: page.title,
            snippets: [{
                source: IMBRICATE_SEARCH_SNIPPET_PAGE_SNIPPET_SOURCE.TITLE,
                snippet: page.title,
                highlight: {
                    start: titleIndex,
                    length: keyword.length,
                },
            }],
        };
    });
};
