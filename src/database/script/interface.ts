/**
 * @author WMXPY
 * @namespace Database_Script
 * @description Interface
 */

export interface IScriptHistoryRecord {

    readonly updatedAt: Date;
    readonly digest: string;
}

export interface IScriptConfig {

    scriptName: string;
    description?: string;

    identifier: string;

    digest: string;
    scriptDigest: string;

    historyRecords: IScriptHistoryRecord[];

    scriptUpdatedAt: Date;
}

export interface IScript extends IScriptConfig {

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
