/**
 * @author WMXPY
 * @namespace OriginTest
 * @description Origin Test
 */

import { IImbricateOrigin } from "@imbricate/core";
import { startImbricateOriginCollectionCreateTest } from "./collection/create";
import { disposeOrigin } from "./common";

export const startImbricateOriginTest = (
    origin: IImbricateOrigin,
): void => {

    afterAll(async () => {
        await disposeOrigin(origin);
    });

    startImbricateOriginCollectionCreateTest(
        origin,
    );
};
