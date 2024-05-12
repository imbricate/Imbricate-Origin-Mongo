/**
 * @author WMXPY
 * @namespace OriginTest
 * @description Origin Test
 */

import { startImbricateOriginCollectionCreateTest } from "./collection/create";
import { ImbricateOriginTestingTarget } from "./testing-target";

export const startImbricateOriginTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Origin with Imbricate Origin Testing Jest", () => {

        beforeAll(async () => {
            await testingTarget.construct();
        });

        afterAll(async () => {
            await testingTarget.dispose();
        });

        startImbricateOriginCollectionCreateTest(
            testingTarget,
        );
    });
};
