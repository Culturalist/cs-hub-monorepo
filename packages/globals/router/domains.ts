import { appName } from "../appsConfig";

export const domains: Record<string, string> = {
    global: "https://culturas.fi/",
    culturas: "https://culturas.fi/",
    culturaweek: "https://culturaweek.fi/",
    juhlarahasto: "https://juhlarahasto.fi/",
    instituutiot: "https://instituutiot.culturas.fi/",
    venajankieliset: "https://venajankieliset.culturas.fi/",
    tieto: "https://tieto.culturas.fi/"
};

export const appDomain = domains[appName] || "";
