import { AppConfig } from "./types";

export const appName = process.env.NEXT_PUBLIC_APP_NAME || process.env.SANITY_STUDIO_APP_NAME || "hub";

export const appsConfig: Record<string, AppConfig> = {
    hub: {
        title: "Cultura-säätiö Hub",
        schemas: {
            documents: ["page", "project", "post", "event", "person", "note", "organisation"],
            links: ["page", "project", "post", "person", "event"],
            navigation: ["page", "project", "event"],
            create: ["page", "project", "post", "person", "event", "organisation", "note", "label", "palette"]
        }
    },
    culturas: {
        title: "Cultura-säätiö",
        schemas: {
            documents: ["page", "project", "post", "event", "person", "organisation"],
            links: ["page", "project", "post", "person", "event"],
            navigation: ["page", "project", "event"],
            create: ["page", "project", "post", "person", "event", "label", "organisation", "palette"]
        },
        tokens: {
            googleTag: ""
        }
    },
    culturaweek: {
        title: "CulturaWeek",
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
        schemas: {
            documents: ["page", "post", "event", "note", "person", "organisation"],
            links: ["page", "person", "post", "event"],
            navigation: ["page", "event"],
            create: ["page", "person", "post", "event", "label", "organisation", "note", "palette"]
        },
        tokens: {
            googleTag: "G-580T1LN9R6"
        }
    },
    instituutit: {
        title: "Instituutit",
        schemas: {
            documents: ["page", "project", "event", "person", "organisation"],
            links: ["page", "person", "project", "event"],
            navigation: ["page", "project", "event"],
            create: ["page", "person", "project", "event", "label", "organisation", "palette"]
        },
        tokens: {
            googleTag: ""
        }
    },
    venajankieliset: {
        title: "Venäjänkieliset",
        schemas: {
            documents: ["page", "project", "event", "person", "organisation"],
            links: ["page", "person", "project", "event"],
            navigation: ["page", "project", "event"],
            create: ["page", "person", "project", "event", "label", "organisation", "palette"]
        },
        tokens: {
            googleTag: ""
        }
    },
    tieto: {
        title: "Cultura-säätiö",
        schemas: {
            documents: ["page", "person", "organisation"],
            links: ["page", "person"],
            navigation: ["page"],
            create: ["page", "person", "label", "organisation", "palette"]
        },
        tokens: {
            googleTag: ""
        }
    }
};

export const appConfig = appsConfig[appName];
