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

        afterAll(async () => {

            await origin.deleteCollection("test-collection");
        });

        it("should not contain collection at the beginning",
            async (): Promise<void> => {

                const hasCollection: boolean = await origin.hasCollection("test-collection");

                expect(hasCollection).toBeFalsy();
            },
        );

        it("should be able to create collection",
            async (): Promise<void> => {

                await origin.createCollection("test-collection");

                const hasCollection: boolean = await origin.hasCollection("test-collection");

                expect(hasCollection).toBeTruthy();
            },
        );
    });
};
