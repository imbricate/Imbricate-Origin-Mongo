/**
 * @author WMXPY
 * @namespace OriginTest
 * @description Common
 */

import { IImbricateOrigin } from "@imbricate/core";

const disposedOriginSet: Set<IImbricateOrigin> = new Set();

export const disposeOrigin = async (origin: IImbricateOrigin): Promise<void> => {

    if (disposedOriginSet.has(origin)) {
        return;
    }

    disposedOriginSet.add(origin);
    if (origin.dispose) {
        await origin.dispose();
    }
};
