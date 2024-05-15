/**
 * @author WMXPY
 * @namespace Util
 * @description Digest
 */

import { createHash } from "crypto";

export const digestString = (input: string): string => {

    return createHash("sha1").update(input).digest("hex");
};

export const digestStringLong = (input: string): string => {

    return createHash("sha256").update(input).digest("hex");
};
