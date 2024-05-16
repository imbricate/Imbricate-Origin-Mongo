/**
 * @author WMXPY
 * @namespace OriginTest
 * @description Origin Test
 * @override E2E
 */

import { ImbricateOriginTestingTarget, startImbricateOriginTest } from "@imbricate/test-origin-jest";
import { MongoImbricateOrigin } from "../../src";

const testingTarget = ImbricateOriginTestingTarget.fromConstructor(
    async () => {

        const origin: MongoImbricateOrigin = await MongoImbricateOrigin.create(
            "mongodb://localhost:27017",
        );
        return origin;
    },
);

startImbricateOriginTest(testingTarget);
