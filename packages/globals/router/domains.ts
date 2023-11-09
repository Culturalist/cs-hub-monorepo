import { appName } from "../appsConfig";

export const domains: Record<string, string> = {
    global: "https://culturas.fi/",
    culturas: "https://culturas.fi/",
    culturaweek: "https://culturaweek.fi/",
    juhlarahasto: "https://juhlarahasto.fi/"
};

export const appDomain = domains[appName] || "";
