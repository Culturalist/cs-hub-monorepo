import { SitemapFile, generateSitemap } from "@cs/data";
import { appConfig, appDomain, appName, routes } from "@cs/globals";

export default async function sitemap(): Promise<SitemapFile[]> {
    return generateSitemap(appName, appDomain, routes, appConfig.schemas.links);
}
