/**
 * @author WMXPY
 * @namespace Page
 * @description Script
 */

import { IImbricateScript, ImbricateScriptAttributes, ImbricateScriptBase, ImbricateScriptCapability, ImbricateScriptHistoryRecord, SandboxExecuteConfig, SandboxExecuteParameter, SandboxFeature } from "@imbricate/core";
import { MarkedResult } from "@sudoo/marked";
import { storeContent } from "../database/content/controller";
import { CONTENT_SOURCE_TYPE } from "../database/content/interface";
import { ContentModel, IContentModel } from "../database/content/model";
import { IScriptModel } from "../database/script/model";
import { digestStringLong } from "../util/digest";

export class MongoImbricateScript extends ImbricateScriptBase implements IImbricateScript {

    public static withModel(script: IScriptModel): MongoImbricateScript {

        return new MongoImbricateScript(script);
    }

    private readonly _script: IScriptModel;

    public readonly capabilities: ImbricateScriptCapability =
        ImbricateScriptBase.allAllowCapability();

    private constructor(
        script: IScriptModel,
    ) {

        super();
        this._script = script;
    }

    public get scriptName(): string {
        return this._script.scriptName;
    }
    public get identifier(): string {
        return this._script.identifier;
    }
    public get digest(): string {
        return this._script.imbricateDigest;
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
        return this._script.imbricateUpdatedAt;
    }

    public async readScript(): Promise<string> {

        const content = await ContentModel.findOne({
            digest: this._script.scriptDigest,
        });

        if (!content) {
            throw new Error("Content not found");
        }
        return content.content;
    }

    public async writeScript(
        script: string,
    ): Promise<void> {

        const digest: string = digestStringLong(script);

        if (this._script.scriptDigest === digest) {
            return;
        }
        const contentModel: IContentModel = await storeContent(
            CONTENT_SOURCE_TYPE.SCRIPT,
            digest,
            script,
        );

        this._script.updateScript(contentModel.digest);
        await this._script.save();
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
        updatedAt: Date,
        digest: string,
    ): Promise<void> {

        this._script.imbricateUpdatedAt = updatedAt;
        this._script.imbricateDigest = digest;

        await this._script.save();
    }

    public async refreshUpdatedAt(
        updatedAt: Date,
    ): Promise<void> {

        this._script.imbricateUpdatedAt = updatedAt;

        await this._script.save();
    }

    public async refreshDigest(
        digest: string,
    ): Promise<void> {

        this._script.imbricateDigest = digest;

        await this._script.save();
    }

    public async addHistoryRecord(
        record: ImbricateScriptHistoryRecord,
    ): Promise<void> {

        this._script.historyRecords = [
            ...this._script.historyRecords,
            record,
        ];

        await this._script.save();
    }

    public async execute(
        _features: SandboxFeature[],
        _config: SandboxExecuteConfig,
        _parameter: SandboxExecuteParameter,
    ): Promise<MarkedResult> {

        throw new Error("Method not implemented.");
    }
}
