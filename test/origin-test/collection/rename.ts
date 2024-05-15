/**
 * @author WMXPY
 * @namespace Collection
 * @description Rename
 */

import { IImbricateCollection, IImbricateOrigin } from "@imbricate/core";
import { ImbricateOriginTestingTarget } from "../testing-target";

export const startImbricateOriginCollectionRenameTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Collection (Rename) Features", () => {

        const toBeDeleted: string[] = [];
        let collection: IImbricateCollection = null as unknown as IImbricateCollection;

        beforeAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const createdCollection: IImbricateCollection =
                await origin.createCollection("test-collection-rename");

            toBeDeleted.push(createdCollection.uniqueIdentifier);
            collection = createdCollection;
        });

        afterAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            for (const collectionUniqueIdentifier of toBeDeleted) {
                await origin.deleteCollection(collectionUniqueIdentifier);
            }
        });

        it("should be able to confirm the original collection name", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();

            const foundCollectionByIdentifier: IImbricateCollection | null = await origin.getCollection(collection.uniqueIdentifier);

            expect(foundCollectionByIdentifier).toBeDefined();
            expect(foundCollectionByIdentifier!.collectionName).toBe("test-collection-rename");

            const foundCollectionByName: IImbricateCollection | null = await origin.findCollection("test-collection-rename");

            expect(foundCollectionByName).toBeDefined();
            expect(foundCollectionByName!.collectionName).toBe("test-collection-rename");
        });

        it("should be able to rename collection", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();

            await origin.renameCollection(
                collection.uniqueIdentifier,
                "test-collection-rename-new",
            );
        });

        it("should be able to confirm the updated collection name", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();

            const foundCollectionByIdentifier: IImbricateCollection | null = await origin.getCollection(collection.uniqueIdentifier);

            expect(foundCollectionByIdentifier).toBeDefined();
            expect(foundCollectionByIdentifier!.collectionName).toBe("test-collection-rename-new");

            const foundCollectionByName: IImbricateCollection | null = await origin.findCollection("test-collection-rename-new");

            expect(foundCollectionByName).toBeDefined();
            expect(foundCollectionByName!.collectionName).toBe("test-collection-rename-new");
        });

    });
};
