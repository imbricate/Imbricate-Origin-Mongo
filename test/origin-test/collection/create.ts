/**
 * @author WMXPY
 * @namespace Collection
 * @description Create
 */

import { IImbricateOrigin } from "@imbricate/core";

export const startImbricateOriginCollectionCreateTest = (
    origin: IImbricateOrigin,
): void => {

    describe(`Test Imbricate Collection Create for a "${origin.originType}" Origin`, () => {

        it("should be able to create collection", async (): Promise<void> => {

            await origin.createCollection("test-collection");

            const hasCollection: boolean = await origin.hasCollection("test-collection");

            expect(hasCollection).toBeTruthy();
        });
    });
};
