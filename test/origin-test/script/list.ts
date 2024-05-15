/**
 * @author WMXPY
 * @namespace Script
 * @description List
 */

import { IImbricateCollection, IImbricateOrigin, IImbricatePage, ImbricatePageSnapshot } from "@imbricate/core";
import { PageToBeDeleted } from "../definition";
import { ImbricateOriginTestingTarget } from "../testing-target";

export const startImbricateOriginScriptListTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Script (List) Features", () => {

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

            const directoriesLevelPageTwo: IImbricatePage = await collection.createPage(
                ["directories"],
                "directories-level-page-two",
                "test-content",
            );

            pageToBeDeleted.push({
                identifier: directoriesLevelPageTwo.identifier,
                collectionIdentifier: collection.uniqueIdentifier,
            });

            const thirdLevelPage: IImbricatePage = await collection.createPage(
                ["directories", "third-level"],
                "third-level-page",
                "test-content",
            );

            pageToBeDeleted.push({
                identifier: thirdLevelPage.identifier,
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

        it("should be able to find second level page", async (): Promise<void> => {

            const pages: ImbricatePageSnapshot[] = await collection.listPages([
                "directories",
            ], false);

            expect(pages).toHaveLength(2);
        });

        it("should be able to find third level page", async (): Promise<void> => {

            const pages: ImbricatePageSnapshot[] = await collection.listPages([
                "directories",
                "third-level",
            ], false);

            expect(pages).toHaveLength(1);
        });

        it("should be able to find root level page recursively", async (): Promise<void> => {

            const pages: ImbricatePageSnapshot[] = await collection.listPages([], true);

            expect(pages).toHaveLength(4);
        });

        it("should be able to find second level page recursively", async (): Promise<void> => {

            const pages: ImbricatePageSnapshot[] = await collection.listPages([
                "directories",
            ], true);

            expect(pages).toHaveLength(3);
        });

        it("should be able to find root level directories", async (): Promise<void> => {

            const directories: string[] = await collection.listDirectories([]);

            expect(directories).toHaveLength(1);
            expect(directories).toStrictEqual(["directories"]);
        });

        it("should be able to find second level directories", async (): Promise<void> => {

            const directories: string[] = await collection.listDirectories(["directories"]);

            expect(directories).toHaveLength(1);
            expect(directories).toStrictEqual(["third-level"]);
        });

        it("should be able to find third level directories", async (): Promise<void> => {

            const directories: string[] = await collection.listDirectories([
                "directories",
                "third-level",
            ]);

            expect(directories).toHaveLength(0);
        });
    });
};
