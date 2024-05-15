/**
 * @author WMXPY
 * @namespace Collection
 * @description Find
 */

import { IImbricateCollection, IImbricateOrigin } from "@imbricate/core";
import { ImbricateOriginTestingTarget } from "../testing-target";

export const startImbricateOriginCollectionFindTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Collection (Find) Features", () => {

        const toBeDeleted: string[] = [];
        let collection: IImbricateCollection = null as unknown as IImbricateCollection;

        beforeAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const createdCollection: IImbricateCollection =
                await origin.createCollection("test-collection-find");

            collection = createdCollection;
        });

        afterAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            for (const collectionUniqueIdentifier of toBeDeleted) {
                await origin.deleteCollection(collectionUniqueIdentifier);
            }
        });

        it("should be able to find the collection with collection name", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();

            const collection: IImbricateCollection | null = await origin.findCollection("test-collection-find");

            expect(collection).toBeDefined();
            expect(collection!.collectionName).toBe("test-collection-find");
        });

        it("should ne able to get the collection with unique identifier", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();

            const getCollection: IImbricateCollection | null = await origin.getCollection(collection.uniqueIdentifier);

            expect(getCollection).toBeDefined();
            expect(getCollection!.collectionName).toBe("test-collection-find");
        });
    });
};
