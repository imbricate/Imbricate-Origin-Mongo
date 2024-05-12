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

        beforeAll(async () => {
            await testingTarget.construct();
        });

        afterAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();

            for (const collectionUniqueIdentifier of toBeDeleted) {
                await origin.deleteCollection(collectionUniqueIdentifier);
            }
        });

        afterAll(async () => {
            await testingTarget.dispose();
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

            const hasCollection: boolean = await origin.hasCollection("test-collection");

            expect(hasCollection).toBeTruthy();
        });
    });
};
