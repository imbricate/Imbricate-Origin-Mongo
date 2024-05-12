/**
 * @author WMXPY
 * @namespace Page
 * @description Create
 */

import { IImbricateOrigin, IImbricateOriginCollection, IImbricatePage } from "@imbricate/core";
import { PageToBeDeleted } from "../definition";
import { ImbricateOriginTestingTarget } from "../testing-target";

export const startImbricateOriginPageUpdateTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Page Update", () => {

        const pageToBeDeleted: PageToBeDeleted[] = [];
        const collectionToBeDeleted: string[] = [];

        let collection: IImbricateOriginCollection = null as unknown as IImbricateOriginCollection;
        let page: IImbricatePage = null as unknown as IImbricatePage;

        beforeAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const testCollection: IImbricateOriginCollection =
                await origin.createCollection("test-page-update");

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
                await collection?.deletePage(page.identifier);
            }

            for (const collectionUniqueIdentifier of collectionToBeDeleted) {
                await origin.deleteCollection(collectionUniqueIdentifier);
            }
        });

        it("verify page is created", async (): Promise<void> => {

            expect(page).toBeDefined();
            expect(page.historyRecords).toHaveLength(1);

            expect(page.historyRecords[0].digest).toBe(page.digest);
        });

        it("should be able to update page with same content", async (): Promise<void> => {

            await page.writeContent("test-content");

            expect(page.historyRecords).toHaveLength(1);
            expect(page.historyRecords[0].digest).toBe(page.digest);
        });

        it("should be able to update page with different content", async (): Promise<void> => {

            await page.writeContent("test-content-2");

            expect(page.historyRecords).toHaveLength(2);
            expect(page.historyRecords[0].digest).not.toBe(page.digest);
        });
    });
};
