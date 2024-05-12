/**
 * @author WMXPY
 * @namespace OriginTest
 * @description Origin Test
 */

import { IImbricateOrigin } from "@imbricate/core";
import { startImbricateOriginCollectionCreateTest } from "./collection/create";

export const startImbricateOriginTest = (
    origin: IImbricateOrigin,
): void => {

    startImbricateOriginCollectionCreateTest(
        origin,
    );
};
