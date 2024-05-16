/**
 * @author WMXPY
 * @namespace Page
 * @description Retitle
 */

import { IImbricateCollection, IImbricateOrigin, IImbricatePage } from "@imbricate/core";
import { PageToBeDeleted } from "../definition";
import { ImbricateOriginTestingTarget } from "../testing-target";

export const startImbricateOriginPageRetitleTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Page (Retitle) Features", () => {

        const pageToBeDeleted: PageToBeDeleted[] = [];
        const collectionToBeDeleted: string[] = [];

        let collection: IImbricateCollection = null as unknown as IImbricateCollection;
        let page: IImbricatePage = null as unknown as IImbricatePage;

        beforeAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const testCollection: IImbricateCollection =
                await origin.createCollection("test-page-retitle");

            collectionToBeDeleted.push(testCollection.uniqueIdentifier);

            collection = testCollection;

            const testPage: IImbricatePage = await collection.createPage(
                [],
                "old-title",
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

        it("should be able to confirm old title", async (): Promise<void> => {

            const targetPage = await collection.getPage(
                page.identifier,
            );

            expect(targetPage).toBeDefined();
            expect(targetPage!.title).toStrictEqual("old-title");
        });

        it("should be able to retitle page", async (): Promise<void> => {

            await collection.retitlePage(
                page.identifier,
                "new-title",
            );
        });

        it("should be able to confirm new title", async (): Promise<void> => {

            const targetPage = await collection.getPage(
                page.identifier,
            );

            expect(targetPage).toBeDefined();
            expect(targetPage!.title).toStrictEqual("new-title");
        });
    });
};
