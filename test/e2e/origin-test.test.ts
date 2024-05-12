/**
 * @author WMXPY
 * @namespace OriginTest
 * @description Origin Test
 * @override E2E
 */

import { MongoImbricateOrigin } from "../../src";
import { startImbricateOriginTest } from "../origin-test/origin-test";

describe("Placeholder", (): void => {

    let origin: MongoImbricateOrigin | null = null;

    beforeAll(async () => {

        origin = await MongoImbricateOrigin.create("mongodb://localhost:27017");
    });

    startImbricateOriginTest(origin as unknown as MongoImbricateOrigin);
});
