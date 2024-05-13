/**
 * @author WMXPY
 * @namespace OriginTest
 * @description Origin Test
 */

import { startImbricateOriginCollectionCreateTest } from "./collection/create";
import { startImbricateOriginPageCreateTest } from "./page/create";
import { startImbricateOriginPageUpdateTest } from "./page/update";
import { ImbricateOriginTestingTarget } from "./testing-target";

export const startImbricateOriginTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("End-to-End Test for Imbricate Origin with Imbricate Origin Testing in Jest", () => {

        beforeAll(async () => {
            await testingTarget.construct();
        });

        afterAll(async () => {
            await testingTarget.dispose();
        });

        startImbricateOriginCollectionCreateTest(
            testingTarget,
        );

        startImbricateOriginPageCreateTest(
            testingTarget,
        );
        startImbricateOriginPageUpdateTest(
            testingTarget,
        );
    });
};
