import { MetadataRoute } from "next";
import { generateSitemap } from "@cs/data";
import { appConfig, appDomain, appName, routes } from "@cs/globals";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return generateSitemap(appName, appDomain, routes, appConfig.schemas.links);
}
