/**
 * @author WMXPY
 * @namespace Page
 * @description Attribute
 */

import { IImbricateCollection, IImbricateOrigin, IImbricatePage } from "@imbricate/core";
import { PageToBeDeleted } from "../definition";
import { ImbricateOriginTestingTarget } from "../testing-target";

export const startImbricateOriginPageAttributeTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Page (Attribute) Features", () => {

        const pageToBeDeleted: PageToBeDeleted[] = [];
        const collectionToBeDeleted: string[] = [];

        let collection: IImbricateCollection = null as unknown as IImbricateCollection;
        let page: IImbricatePage = null as unknown as IImbricatePage;

        beforeAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const testCollection: IImbricateCollection =
                await origin.createCollection("test-page-attribute");

            collectionToBeDeleted.push(testCollection.uniqueIdentifier);

            collection = testCollection;

            const testPage: IImbricatePage = await collection.createPage(
                [],
                "test-page-update",
                "test-content",
            );

            pageToBeDeleted.push({
                identifier: testPage.identifier,
                collectionIdentifier: collection.uniqueIdentifier,
            });
            page = testPage;
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

        it("should be able to start with empty attributes", async (): Promise<void> => {

            const attributes = await page.readAttributes();

            expect(attributes).toStrictEqual({});
        });

        it("should be able to attach attribute", async (): Promise<void> => {

            await page.writeAttribute("test-attribute", "test-value");

            const attributes = await page.readAttributes();

            expect(attributes).toStrictEqual({
                "test-attribute": "test-value",
            });
        });

        it("should be able to attach multiple attributes", async (): Promise<void> => {

            await page.writeAttribute("test-attribute-2", "test-value-2");

            const attributes = await page.readAttributes();

            expect(attributes).toStrictEqual({
                "test-attribute": "test-value",
                "test-attribute-2": "test-value-2",
            });
        });

        it("should be able to update attribute", async (): Promise<void> => {

            await page.writeAttribute("test-attribute", "test-value-2");

            const attributes = await page.readAttributes();

            expect(attributes).toStrictEqual({
                "test-attribute": "test-value-2",
                "test-attribute-2": "test-value-2",
            });
        });
    });
};
