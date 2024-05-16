/**
 * @author WMXPY
 * @namespace Database_Content
 * @description Interface
 */

export enum CONTENT_SOURCE_TYPE {

    PAGE = "PAGE",
    SCRIPT = "SCRIPT",
}

export interface IContentConfig {

    readonly sourceType: CONTENT_SOURCE_TYPE;

    readonly digest: string;
    readonly content: string;
}

export interface IContent extends IContentConfig {

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
