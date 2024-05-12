/**
 * @author WMXPY
 * @namespace Collection
 * @description Create
 */

import { IImbricateOrigin, IImbricateOriginCollection } from "@imbricate/core";
import { ImbricateOriginTestingTarget } from "../testing-target";

export const startImbricateOriginCollectionCreateTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Collection Create", () => {

        const toBeDeleted: string[] = [];

        afterAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            for (const collectionUniqueIdentifier of toBeDeleted) {
                await origin.deleteCollection(collectionUniqueIdentifier);
            }
        });

        it("should not contain collection at the beginning", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const hasCollection: boolean = await origin.hasCollection("test-collection");

            expect(hasCollection).toBeFalsy();
        });

        it("should be able to create collection", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const collection: IImbricateOriginCollection = await origin.createCollection("test-collection");

            expect(collection).toBeDefined();

            toBeDeleted.push(collection.uniqueIdentifier);

        });

        it("should contain collection after creation", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const hasCollection: boolean = await origin.hasCollection("test-collection");

            expect(hasCollection).toBeTruthy();
        });

        it("should included in list", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const collections: IImbricateOriginCollection[] = await origin.listCollections();

            const collection: IImbricateOriginCollection | undefined = collections.find(
                (each: IImbricateOriginCollection) => {
                    return each.collectionName === "test-collection";
                },
            );

            expect(collection).toBeDefined();
        });
    });
};
