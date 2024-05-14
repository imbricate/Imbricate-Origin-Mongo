/**
 * @author WMXPY
 * @namespace Page
 * @description Page
 */

import { IImbricatePage, ImbricatePageAttributes, ImbricatePageBase, ImbricatePageCapability, ImbricatePageHistoryRecord } from "@imbricate/core";
import { storeContent } from "../database/content/controller";
import { ContentModel, IContentModel } from "../database/content/model";
import { IPageModel } from "../database/page/model";
import { digestStringLong } from "../util/digest";

export class MongoImbricatePage extends ImbricatePageBase implements IImbricatePage {

    public static withModel(page: IPageModel): MongoImbricatePage {

        return new MongoImbricatePage(page);
    }

    private readonly _page: IPageModel;

    public readonly capabilities: ImbricatePageCapability =
        ImbricatePageBase.allAllowCapability();

    private constructor(
        page: IPageModel,
    ) {

        super();
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
        return this._page.contentDigest;
    }
    public get historyRecords(): ImbricatePageHistoryRecord[] {
        return this._page.historyRecords;
    }
    public get createdAt(): Date {
        return this._page.createdAt;
    }
    public get updatedAt(): Date {
        return this._page.contentUpdatedAt;
    }

    public async readContent(): Promise<string> {

        const content = await ContentModel.findOne({
            digest: this.digest,
        });

        if (!content) {
            throw new Error("Content not found");
        }
        return content.content;
    }

    public async writeContent(
        content: string,
    ): Promise<void> {

        const digest: string = digestStringLong(content);

        if (this.digest === digest) {
            return;
        }
        const contentModel: IContentModel = await storeContent(digest, content);

        this._page.updateContent(contentModel.digest);
        await this._page.save();
    }

    public async readAttributes(): Promise<ImbricatePageAttributes> {

        return this._page.attributes;
    }

    public async writeAttribute(
        key: string,
        value: string,
    ): Promise<void> {

        this._page.attributes = {
            ...this._page.attributes,
            [key]: value,
        };
        await this._page.save();
    }

    public async refreshUpdateMetadata(
        updatedAt: Date,
        digest: string,
    ): Promise<void> {

        this._page.contentUpdatedAt = updatedAt;
        this._page.contentDigest = digest;

        await this._page.save();
    }

    public async refreshUpdatedAt(
        updatedAt: Date,
    ): Promise<void> {

        this._page.contentUpdatedAt = updatedAt;

        await this._page.save();
    }

    public async refreshDigest(
        digest: string,
    ): Promise<void> {

        this._page.contentDigest = digest;

        await this._page.save();
    }

    public async addHistoryRecord(
        record: ImbricatePageHistoryRecord,
    ): Promise<void> {

        this._page.historyRecords = [
            ...this._page.historyRecords,
            record,
        ];

        await this._page.save();
    }
}
