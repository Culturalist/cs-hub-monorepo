import { createClient as createClientNext } from "next-sanity";
import { createClient } from "@sanity/client";
import { globalConfig } from "@cs/globals";

//Sanity project variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || "";

const apiVersion = globalConfig.latestUpdate;
const dataset = "production";

//Sanity Next client
export const client = createClient({
    projectId,
    dataset,
    apiVersion, // https://www.sanity.io/docs/api-versioning
    useCdn: false, // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
    maxRetries: 0
});

//Sanity Next client
export const clientNext = createClientNext({
    projectId,
    dataset,
    apiVersion, // https://www.sanity.io/docs/api-versioning
    useCdn: false, // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
    maxRetries: 0
});
