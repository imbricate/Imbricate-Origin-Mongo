/**
 * @author WMXPY
 * @namespace OriginTest
 * @description Origin Test
 * @override E2E
 */

import { MongoImbricateOrigin } from "../../src";
import { startImbricateOriginTest } from "../origin-test/origin-test";

(async () => {

    const origin = await MongoImbricateOrigin.create("mongodb://localhost:27017");

    describe('Origin', () => {
        startImbricateOriginTest(origin);
    });
})();
