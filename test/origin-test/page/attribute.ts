/**
 * @author WMXPY
 * @namespace Page
 * @description Attribute
 */

import { IImbricateOrigin, IImbricateOriginCollection, IImbricatePage } from "@imbricate/core";
import { ImbricateOriginTestingTarget } from "../testing-target";
import { PageToBeDeleted } from "../definition";

export const startImbricateOriginPageAttributeTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Page (Attribute) Features", () => {

        const pageToBeDeleted: PageToBeDeleted[] = [];
        const collectionToBeDeleted: string[] = [];

        let collection: IImbricateOriginCollection = null as unknown as IImbricateOriginCollection;

        beforeAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const testCollection: IImbricateOriginCollection =
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
