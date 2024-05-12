/**
 * @author WMXPY
 * @namespace Database_Content
 * @description Interface
 */

export interface IContentConfig {

    readonly digest: string;
    readonly content: string;
}

export interface IContent extends IContentConfig {

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
