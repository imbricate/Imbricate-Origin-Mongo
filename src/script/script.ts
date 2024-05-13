/**
 * @author WMXPY
 * @namespace Page
 * @description Script
 */

import { IImbricateScript, ImbricateScriptAttributes, ImbricateScriptCapability, ImbricateScriptHistoryRecord, SandboxExecuteConfig, SandboxExecuteParameter, SandboxFeature } from "@imbricate/core";
import { MarkedResult } from "@sudoo/marked";

export class MongoImbricateScript implements IImbricateScript {

    scriptName: string;
    identifier: string;
    digest: string;
    historyRecords: ImbricateScriptHistoryRecord[];
    description?: string | undefined;
    createdAt: Date;
    updatedAt: Date;
    capabilities: ImbricateScriptCapability;

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
