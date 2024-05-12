/**
 * @author WMXPY
 * @namespace Database_Page
 * @description Interface
 */

export interface IPageHistoryRecord {

    readonly updatedAt: Date;
    readonly digest: string;
}

export interface IPageConfig {

    title: string;
    description?: string;

    directories: string[];
    identifier: string;

    digest: string;

    historyRecords: IPageHistoryRecord[];
}

export interface IPage extends IPageConfig {

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
