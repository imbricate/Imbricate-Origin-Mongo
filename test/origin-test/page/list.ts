/**
 * @author WMXPY
 * @namespace Page
 * @description List
 */

import { IImbricateCollection, IImbricateOrigin, IImbricatePage, ImbricatePageSnapshot } from "@imbricate/core";
import { PageToBeDeleted } from "../definition";
import { ImbricateOriginTestingTarget } from "../testing-target";

export const startImbricateOriginPageListTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Page (List) Features", () => {

        const pageToBeDeleted: PageToBeDeleted[] = [];
        const collectionToBeDeleted: string[] = [];

        let collection: IImbricateCollection = null as unknown as IImbricateCollection;

        beforeAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const testCollection: IImbricateCollection =
                await origin.createCollection("test-page-list");

            collectionToBeDeleted.push(testCollection.uniqueIdentifier);

            collection = testCollection;

            const rootLevelPage: IImbricatePage = await collection.createPage(
                [],
                "root-level-page",
                "test-content",
            );

            pageToBeDeleted.push({
                identifier: rootLevelPage.identifier,
                collectionIdentifier: collection.uniqueIdentifier,
            });

            const directoriesLevelPage: IImbricatePage = await collection.createPage(
                ["directories"],
                "directories-level-page",
                "test-content",
            );

            pageToBeDeleted.push({
                identifier: directoriesLevelPage.identifier,
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

        it("should be able to find root level page", async (): Promise<void> => {

            const pages: ImbricatePageSnapshot[] = await collection.listPages([], false);

            expect(pages).toHaveLength(1);
        });
    });
};