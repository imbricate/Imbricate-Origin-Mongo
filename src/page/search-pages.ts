/**
 * @author WMXPY
 * @namespace Page
 * @description Search Pages
 */

import { IMBRICATE_SEARCH_RESULT_TYPE, IMBRICATE_SEARCH_SNIPPET_PAGE_SNIPPET_SOURCE, ImbricatePageSearchResult, ImbricatePageSearchSnippet, ImbricateSearchPageConfig } from "@imbricate/core";
import { CONTENT_SOURCE_TYPE } from "../database/content/interface";
import { ContentModel, IContentModel } from "../database/content/model";
import { IPageModel, PageModel } from "../database/page/model";

export const mongoSearchPages = async (
    keyword: string,
    config: ImbricateSearchPageConfig,
): Promise<ImbricatePageSearchResult[]> => {

    const foundContents: IContentModel[] = await ContentModel.find({
        sourceType: CONTENT_SOURCE_TYPE.PAGE,
        content: {
            $regex: new RegExp(keyword, "i"),
        },
    }, {}, {
        limit: config.itemLimit,
    });

    const contentMap: Map<string, IContentModel> = new Map();

    for (const content of foundContents) {
        contentMap.set(content.digest, content);
    }

    const pages: IPageModel[] = await PageModel.find({
        $or: [
            {
                title: {
                    $regex: new RegExp(keyword, "i"),
                },
            },
            {
                contentDigest: {
                    $in: foundContents.map((content: IContentModel) => {
                        return content.digest;
                    }),
                },
            },
        ],
    }, {}, {
        limit: config.itemLimit,
    });

    return pages.map((page: IPageModel): ImbricatePageSearchResult => {

        const snippets: ImbricatePageSearchSnippet[] = [];

        let titleIndex: number;
        if (config.exact) {
            titleIndex = page.title.indexOf(keyword);
        } else {
            titleIndex = page.title.search(new RegExp(keyword, "i"));
        }

        if (titleIndex !== -1) {
            snippets.push({
                source: IMBRICATE_SEARCH_SNIPPET_PAGE_SNIPPET_SOURCE.TITLE,
                snippet: page.title,
                highlight: {
                    start: titleIndex,
                    length: keyword.length,
                },
            });
        }

        const content: IContentModel | undefined = contentMap.get(page.contentDigest);

        if (content) {

            let contentIndex: number;
            if (config.exact) {
                contentIndex = content.content.indexOf(keyword);
            } else {
                contentIndex = content.content.search(new RegExp(keyword, "i"));
            }

            if (contentIndex !== -1) {
                snippets.push({
                    source: IMBRICATE_SEARCH_SNIPPET_PAGE_SNIPPET_SOURCE.CONTENT,
                    snippet: content.content,
                    highlight: {
                        start: contentIndex,
                        length: keyword.length,
                    },
                });
            }
        }

        return {
            type: IMBRICATE_SEARCH_RESULT_TYPE.PAGE,
            scope: page.collectionUniqueIdentifier,
            identifier: page.identifier,
            headline: page.title,
            snippets,
        };
    });
};
