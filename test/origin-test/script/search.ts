/**
 * @author WMXPY
 * @namespace Script
 * @description Search
 */

import { IImbricateOrigin, IImbricateScript, ImbricateScriptSearchResult } from "@imbricate/core";
import { ScriptToBeDeleted } from "../definition";
import { ImbricateOriginTestingTarget } from "../testing-target";

export const startImbricateOriginScriptSearchTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Script (Search) Features", () => {

        const scriptToBeDeleted: ScriptToBeDeleted[] = [];

        beforeAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();

            const firstScript: IImbricateScript = await origin.createScript(
                "first-script",
                "first-content",
            );

            scriptToBeDeleted.push({
                identifier: firstScript.identifier,
            });

            const secondScript: IImbricateScript = await origin.createScript(
                "second-script",
                "second-content",
            );

            scriptToBeDeleted.push({
                identifier: secondScript.identifier,
            });
        });

        afterAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();

            for (const script of scriptToBeDeleted) {

                await origin.deleteScript(
                    script.identifier,
                );
            }
        });

        it("should be able to search scripts", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const scripts: ImbricateScriptSearchResult[] = await origin.searchScripts(
                "script",
                {
                },
            );

            expect(scripts).toHaveLength(2);
        });
    });
};
