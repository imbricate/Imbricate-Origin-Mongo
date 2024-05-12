/**
 * @author WMXPY
 * @namespace Page
 * @description Page
 */

import { IImbricatePage, ImbricatePageAttributes, ImbricatePageCapability, ImbricatePageHistoryRecord, createAllAllowImbricatePageCapability } from "@imbricate/core";
import { IPageModel } from "../database/page/model";

export class MongoImbricatePage implements IImbricatePage {

    public static withModel(page: IPageModel): MongoImbricatePage {

        return new MongoImbricatePage(page);
    }

    private readonly _page: IPageModel;

    public readonly capabilities: ImbricatePageCapability =
        createAllAllowImbricatePageCapability();

    private constructor(
        page: IPageModel,
    ) {
        this._page = page;
    }

    public get title(): string {
        return this._page.title;
    }
    public get identifier(): string {
        return this._page.identifier;
    }
    public get directories(): string[] {
        return this._page.directories;
    }
    public get description(): string | undefined {
        return this._page.description;
    }
    public get digest(): string {
        return this._page.digest;
    }
    public get historyRecords(): ImbricatePageHistoryRecord[] {
        return this._page.historyRecords;
    }
    public get createdAt(): Date {
        return this._page.createdAt;
    }
    public get updatedAt(): Date {
        return this._page.updatedAt;
    }

    public readContent(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public writeContent(
        _content: string,
    ): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public readAttributes(): Promise<ImbricatePageAttributes> {
        throw new Error("Method not implemented.");
    }

    public writeAttribute(
        _key: string,
        _value: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public refreshUpdateMetadata(
        _updatedAt: Date,
        _digest: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public refreshUpdatedAt(
        _updatedAt: Date,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public refreshDigest(
        _digest: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public addHistoryRecord(
        _record: ImbricatePageHistoryRecord,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }
}
