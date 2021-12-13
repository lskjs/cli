#!/usr/bin/env node
export declare function gitDownload(uri: string, { dest, depth, rm }?: {
    dest: any;
    depth?: number | undefined;
    rm?: boolean | undefined;
}): Promise<void>;
export default gitDownload;
