/**
 * @author WMXPY
 * @namespace OriginTest
 * @description Origin Test
 */

import { IImbricateOrigin } from "@imbricate/core";
import { startImbricateOriginCollectionCreateTest } from "./collection/create";
import { disposeOrigin } from "./common";
import { ImbricateOriginTestConstructionFunction } from "./testing-target";

export const startImbricateOriginTest = (
    constructFunction: ImbricateOriginTestConstructionFunction,
): void => {

    describe("Test Imbricate Origin with Imbricate Origin Testing Jest", () => {

        beforeAll(async () => {

            origin = await constructFunction();
        });

        afterAll(async () => {
            await disposeOrigin(origin);
        });

        startImbricateOriginCollectionCreateTest(
            origin,
        );
    });
};
