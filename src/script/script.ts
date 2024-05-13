/**
 * @author WMXPY
 * @namespace Page
 * @description Script
 */

import { IImbricateScript, ImbricateScriptAttributes, ImbricateScriptCapability, ImbricateScriptHistoryRecord, SandboxExecuteConfig, SandboxExecuteParameter, SandboxFeature, createAllAllowImbricateScriptCapability } from "@imbricate/core";
import { MarkedResult } from "@sudoo/marked";
import { IScriptModel } from "../database/script/model";

export class MongoImbricateScript implements IImbricateScript {

    public static withModel(script: IScriptModel): MongoImbricateScript {

        return new MongoImbricateScript(script);
    }

    private readonly _script: IScriptModel;

    public readonly capabilities: ImbricateScriptCapability =
        createAllAllowImbricateScriptCapability();

    private constructor(
        script: IScriptModel,
    ) {
        this._script = script;
    }

    public get scriptName(): string {
        return this._script.scriptName;
    }
    public get identifier(): string {
        return this._script.identifier;
    }
    public get digest(): string {
        return this._script.scriptDigest;
    }
    public get historyRecords(): ImbricateScriptHistoryRecord[] {
        return this._script.historyRecords;
    }
    public get description(): string | undefined {
        return this._script.description;
    }
    public get createdAt(): Date {
        return this._script.createdAt;
    }
    public get updatedAt(): Date {
        return this._script.scriptUpdatedAt;
    }

    public async readScript(): Promise<string> {

        throw new Error("Method not implemented.");
    }

    public async writeScript(
        _script: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public async readAttributes(): Promise<ImbricateScriptAttributes> {

        throw new Error("Method not implemented.");
    }

    public async writeAttribute(
        _key: string,
        _value: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public async refreshUpdateMetadata(
        _updatedAt: Date,
        _digest: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public async refreshUpdatedAt(
        _updatedAt: Date,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public async refreshDigest(
        _digest: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public async addHistoryRecord(
        _record: ImbricateScriptHistoryRecord,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public async execute(
        _features: SandboxFeature[],
        _config: SandboxExecuteConfig,
        _parameter: SandboxExecuteParameter,
    ): Promise<MarkedResult> {

        throw new Error("Method not implemented.");
    }
}
