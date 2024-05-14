/**
 * @author WMXPY
 * @namespace Page
 * @description Create
 */

import { IImbricateOrigin, IImbricateCollection, IImbricatePage } from "@imbricate/core";
import { ImbricateOriginTestingTarget } from "../testing-target";
import { PageToBeDeleted } from "../definition";

export const startImbricateOriginPageCreateTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Page (Create) Features", () => {

        const pageToBeDeleted: PageToBeDeleted[] = [];
        const collectionToBeDeleted: string[] = [];

        let collection: IImbricateCollection = null as unknown as IImbricateCollection;

        beforeAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const testCollection: IImbricateCollection =
                await origin.createCollection("test-page-create");

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
                await collection?.deletePage(page.identifier);
            }

            for (const collectionUniqueIdentifier of collectionToBeDeleted) {
                await origin.deleteCollection(collectionUniqueIdentifier);
            }
        });

        it("should be able to create page", async (): Promise<void> => {

            const page: IImbricatePage = await collection.createPage(
                [],
                "test-page",
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
