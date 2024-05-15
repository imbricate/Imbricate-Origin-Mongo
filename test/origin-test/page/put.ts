/**
 * @author WMXPY
 * @namespace Page
 * @description Put
 */

import { IImbricateCollection, IImbricateOrigin, IImbricatePage, ImbricatePageMetadata } from "@imbricate/core";
import { PageToBeDeleted } from "../definition";
import { ImbricateOriginTestingTarget } from "../testing-target";

export const startImbricateOriginPagePutTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Page (Put) Features", () => {

        const pageToBeDeleted: PageToBeDeleted[] = [];
        const collectionToBeDeleted: string[] = [];

        let collection: IImbricateCollection = null as unknown as IImbricateCollection;

        beforeAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const testCollection: IImbricateCollection =
                await origin.createCollection("test-page-put");

            collectionToBeDeleted.push(testCollection.uniqueIdentifier);

            collection = testCollection;
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

        it("should be able to put a new page", async (): Promise<void> => {

            const pageMetadata: ImbricatePageMetadata = {
                directories: [],
                title: "test-page",
                identifier: "test-page",
                createdAt: new Date(),
                updatedAt: new Date(),
                digest: "test-digest",
                historyRecords: [],
            };

            const page: IImbricatePage = await collection.putPage(
                pageMetadata,
                "test-content",
            );

            pageToBeDeleted.push({
                identifier: page.identifier,
                collectionIdentifier: collection.uniqueIdentifier,
            });

            expect(page).toBeDefined();

            const pageContent: string = await page.readContent();

            expect(pageContent).toBe("test-content");
        });
    });
};
