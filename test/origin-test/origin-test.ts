/**
 * @author WMXPY
 * @namespace OriginTest
 * @description Origin Test
 */

import { startImbricateOriginCollectionCreateTest } from "./collection/create";
import { startImbricateOriginCollectionFindTest } from "./collection/find";
import { startImbricateOriginCollectionRenameTest } from "./collection/rename";
import { startImbricateOriginPageAttributeTest } from "./page/attribute";
import { startImbricateOriginPageCreateTest } from "./page/create";
import { startImbricateOriginPageListTest } from "./page/list";
import { startImbricateOriginPageRetitleTest } from "./page/retitle";
import { startImbricateOriginPageSearchTest } from "./page/search";
import { startImbricateOriginPageUpdateTest } from "./page/update";
import { startImbricateOriginScriptAttributeTest } from "./script/attribute";
import { startImbricateOriginScriptCreateTest } from "./script/create";
import { startImbricateOriginScriptListTest } from "./script/list";
import { startImbricateOriginScriptRenameTest } from "./script/rename";
import { startImbricateOriginScriptSearchTest } from "./script/search";
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

        startImbricateOriginCollectionCreateTest(testingTarget);
        startImbricateOriginCollectionFindTest(testingTarget);
        startImbricateOriginCollectionRenameTest(testingTarget);

        startImbricateOriginPageAttributeTest(testingTarget);
        startImbricateOriginPageCreateTest(testingTarget);
        startImbricateOriginPageListTest(testingTarget);
        startImbricateOriginPageRetitleTest(testingTarget);
        startImbricateOriginPageSearchTest(testingTarget);
        startImbricateOriginPageUpdateTest(testingTarget);

        startImbricateOriginScriptAttributeTest(testingTarget);
        startImbricateOriginScriptCreateTest(testingTarget);
        startImbricateOriginScriptListTest(testingTarget);
        startImbricateOriginScriptRenameTest(testingTarget);
        startImbricateOriginScriptSearchTest(testingTarget);
    });
};
