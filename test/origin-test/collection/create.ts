/**
 * @author WMXPY
 * @namespace Collection
 * @description Create
 */

import { IImbricateOrigin } from "@imbricate/core";
import { ImbricateOriginTestingTarget } from "../testing-target";

export const startImbricateOriginCollectionCreateTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Collection Create", () => {

        beforeAll(async () => {
            await testingTarget.construct();
        });

        afterAll(async () => {
            await testingTarget.dispose();
        });

        afterAll(async () => {
            await testingTarget.ensureOrigin().deleteCollection("test-collection");
        });

        it("should not contain collection at the beginning",
            async (): Promise<void> => {

                const origin: IImbricateOrigin = testingTarget.ensureOrigin();
                const hasCollection: boolean = await origin.hasCollection("test-collection");

                expect(hasCollection).toBeFalsy();
            },
        );

        it("should be able to create collection",
            async (): Promise<void> => {

                const origin: IImbricateOrigin = testingTarget.ensureOrigin();
                await origin.createCollection("test-collection");

                const hasCollection: boolean = await origin.hasCollection("test-collection");

                expect(hasCollection).toBeTruthy();
            },
        );
    });
};
