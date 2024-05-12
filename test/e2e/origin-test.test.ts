/**
 * @author WMXPY
 * @namespace OriginTest
 * @description Origin Test
 * @override E2E
 */

import { MongoImbricateOrigin } from "../../src";
import { startImbricateOriginTest } from "../origin-test/origin-test";
import { ImbricateOriginTestingTarget } from "../origin-test/testing-target";

describe("Imbricate Origin Test", (): void => {

    const testingTarget = ImbricateOriginTestingTarget.fromConstructor(
        async () => {

            const origin: MongoImbricateOrigin = await MongoImbricateOrigin.create(
                "mongodb://localhost:27017",
            );
            return origin;
        },
    );

    startImbricateOriginTest(testingTarget);
});
