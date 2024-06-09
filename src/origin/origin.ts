/**
 * @author WMXPY
 * @namespace Origin
 * @description Origin
 */

import { IImbricateBinaryStorage, IImbricateCollectionManager, IImbricateFunctionManager, IImbricateOrigin, IImbricateScriptManager, IMBRICATE_DIGEST_ALGORITHM, ImbricateOriginBase, ImbricateOriginCapability, ImbricateOriginMetadata } from "@imbricate/core";
import { Connection } from "mongoose";
import { MongoImbricateCollectionManager } from "../collection-manager/collection-manager";
import { connectDatabase } from "../database/connect";
import { MongoImbricateScriptManager } from "../script-manager/script-manager";
import { debugLog } from "../util/debug";
import { digestString } from "../util/digest";

export class MongoImbricateOrigin extends ImbricateOriginBase implements IImbricateOrigin {

    public static create(
        databaseUrl: string,
    ): MongoImbricateOrigin {

        return new MongoImbricateOrigin(databaseUrl);
    }

    private readonly _databaseUrl: string;

    public readonly originType: string = "mongo";
    public readonly capabilities: ImbricateOriginCapability =
        ImbricateOriginBase.allAllowCapability();

    public readonly metadata: ImbricateOriginMetadata = {
        digestAlgorithm: IMBRICATE_DIGEST_ALGORITHM.SHA1,
    };
    public readonly payloads: Record<string, any> = {};

    private _connection: Connection | null;

    private constructor(
        databaseUrl: string,
    ) {

        super();

        this._databaseUrl = databaseUrl;
        this._connection = null;
    }

    public get uniqueIdentifier(): string {
        return digestString(this._databaseUrl);
    }

    public getFunctionManger(): IImbricateFunctionManager {

        throw new Error("Method not implemented.");
    }

    public getBinaryStorage(): IImbricateBinaryStorage {

        throw new Error("Method not implemented.");
    }

    public getScriptManager(): IImbricateScriptManager {

        return MongoImbricateScriptManager.create(
            this._connect.bind(this),
        );
    }

    public getCollectionManager(): IImbricateCollectionManager {

        return MongoImbricateCollectionManager.create(
            this._connect.bind(this),
        );
    }

    public async dispose(): Promise<void> {

        if (!this._connection) {

            debugLog("No connection to dispose", this.uniqueIdentifier);
            return;
        }

        debugLog("Closing mongo database", this.uniqueIdentifier);

        await this._connection.close();
    }

    private async _connect(): Promise<Connection> {

        if (this._connection) {
            return this._connection;
        }

        debugLog("Connecting to mongo database", this.uniqueIdentifier);

        const connection: Connection = await connectDatabase(this._databaseUrl);
        this._connection = connection;

        return connection;
    }
}
