import { AppConfig } from "./types";

export const appName = process.env.NEXT_PUBLIC_APP_NAME || process.env.SANITY_STUDIO_APP_NAME || "template";

export const appsConfig: Record<string, AppConfig> = {
    hub: {
        title: "Cultura-säätiö Hub",
        domain: "https://hub.culturas.fi/",
        schemas: {
            documents: ["page", "person", "post", "project", "event", "note", "organisation"],
            links: ["page", "person", "post", "project", "event", "note"],
            navigation: ["page", "project", "event"],
            create: ["page", "person", "post", "project", "event", "note", "label", "organisation"]
        }
    },
    culturas: {
        title: "Cultura-säätiö",
        domain: "https://culturas.fi/",
        schemas: {
            documents: ["page", "event", "person", "organisation"],
            links: ["page", "person", "event"],
            navigation: ["page", "event"],
            create: ["page", "person", "event", "label", "organisation", "palette"]
        },
        tokens: {
            googleTag: ""
        }
    },
    culturaweek: {
        title: "CulturaWeek",
        domain: "https://culturaweek.fi/",
        schemas: {
            documents: ["page", "event", "person", "organisation"],
            links: ["page", "person", "event"],
            navigation: ["page", "event"],
            create: ["page", "person", "event", "label", "organisation", "palette"]
        },
        tokens: {
            registration: "",
            googleTag: "G-L5CP6G9TYB"
        }
    },
    juhlarahasto: {
        title: "Juhlarahasto",
        domain: "https://juhlarahasto.fi/",
        schemas: {
            documents: ["page", "post", "note", "person", "organisation"],
            links: ["page", "person", "post"],
            navigation: ["page"],
            create: ["page", "person", "post", "label", "organisation", "note", "palette"]
        },
        parentDocuments: {
            post: "tarinat"
        },
        tokens: {
            googleTag: "G-580T1LN9R6"
        }
    },
    template: {
        title: "Cultura-säätiö Website",
        domain: "https://template.culturas.fi/",
        schemas: {
            documents: ["page", "person", "post", "project", "event", "note"],
            links: ["page", "person", "post", "project", "event", "note"],
            navigation: ["page", "project", "event"],
            create: ["page", "person", "post", "project", "event", "note", "label"]
        }
    }
};

export const appConfig = appsConfig[appName];
