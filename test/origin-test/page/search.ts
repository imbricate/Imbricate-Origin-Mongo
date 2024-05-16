/**
 * @author WMXPY
 * @namespace Page
 * @description Search
 */

import { IImbricateCollection, IImbricateOrigin, IImbricatePage, ImbricatePageSearchResult } from "@imbricate/core";
import { PageToBeDeleted } from "../definition";
import { ImbricateOriginTestingTarget } from "../testing-target";

export const startImbricateOriginPageSearchTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Page (Search) Features", () => {

        const pageToBeDeleted: PageToBeDeleted[] = [];
        const collectionToBeDeleted: string[] = [];

        let collection: IImbricateCollection = null as unknown as IImbricateCollection;

        beforeAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const testCollection: IImbricateCollection =
                await origin.createCollection("test-page-list");

            collectionToBeDeleted.push(testCollection.uniqueIdentifier);

            collection = testCollection;

            const titlePage: IImbricatePage = await collection.createPage(
                [],
                "title-with-hello",
                "test-content",
            );

            pageToBeDeleted.push({
                identifier: titlePage.identifier,
                collectionIdentifier: collection.uniqueIdentifier,
            });

            const contentPage: IImbricatePage = await collection.createPage(
                [],
                "title-with-nothing",
                "content-hello",
            );

            pageToBeDeleted.push({
                identifier: contentPage.identifier,
                collectionIdentifier: collection.uniqueIdentifier,
            });

            const bothPage: IImbricatePage = await collection.createPage(
                [],
                "title with hello and content",
                "content-hello",
            );

            pageToBeDeleted.push({
                identifier: bothPage.identifier,
                collectionIdentifier: collection.uniqueIdentifier,
            });
        });

        afterAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();

            for (const page of pageToBeDeleted) {

                const collection = await origin.getCollection(page.collectionIdentifier);
                if (!collection) {
                    throw new Error("Collection not found");
                }
                await collection.deletePage(page.identifier);
            }

            for (const collectionUniqueIdentifier of collectionToBeDeleted) {
                await origin.deleteCollection(collectionUniqueIdentifier);
            }
        });

        it("should be able to search pages", async (): Promise<void> => {

            const pages: ImbricatePageSearchResult[] = await collection.searchPages(
                "hello",
                {
                    limit: 10,
                },
            );

            expect(pages).toHaveLength(3);
        });
    });
};
