/**
 * @author WMXPY
 * @namespace Script
 * @description Attribute
 */

import { IImbricateOrigin, IImbricateScript } from "@imbricate/core";
import { ScriptToBeDeleted } from "../definition";
import { ImbricateOriginTestingTarget } from "../testing-target";

export const startImbricateOriginScriptAttributeTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Script (Attribute) Features", () => {

        const scriptToBeDeleted: ScriptToBeDeleted[] = [];
        let script: IImbricateScript = null as unknown as IImbricateScript;

        beforeAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();

            const testScript: IImbricateScript = await origin.createScript(
                "test-script",
                "test-content",
            );

            scriptToBeDeleted.push({
                identifier: testScript.identifier,
            });
            script = testScript;
        });

        afterAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();

            for (const script of scriptToBeDeleted) {

                await origin.deleteScript(
                    script.identifier,
                );
            }
        });

        it("should be able to start with empty attributes", async (): Promise<void> => {

            const attributes = await script.readAttributes();

            expect(attributes).toStrictEqual({});
        });

        it("should be able to attach attribute", async (): Promise<void> => {

            await script.writeAttribute("test-attribute", "test-value");

            const attributes = await script.readAttributes();

            expect(attributes).toStrictEqual({
                "test-attribute": "test-value",
            });
        });

        it("should be able to attach multiple attributes", async (): Promise<void> => {

            await script.writeAttribute("test-attribute-2", "test-value-2");

            const attributes = await script.readAttributes();

            expect(attributes).toStrictEqual({
                "test-attribute": "test-value",
                "test-attribute-2": "test-value-2",
            });
        });

        it("should be able to update attribute", async (): Promise<void> => {

            await script.writeAttribute("test-attribute", "test-value-2");

            const attributes = await script.readAttributes();

            expect(attributes).toStrictEqual({
                "test-attribute": "test-value-2",
                "test-attribute-2": "test-value-2",
            });
        });
    });
};
