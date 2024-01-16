import { defineType } from "@sanity/types";
import { DocumentApp, capitalize } from "@cs/globals";
import { BlockCards } from "../blockCards/blockCards";
import { BlockColumns } from "../blockColumns";
import { BlockLinks } from "../blockLinks/blockLinks";
import { BlockSchedule } from "../blockSchedule";
import { LocalePortableText } from "../localePortableText";
import { BlockMedia } from "../blockMedia";
import { BlockTable } from "../blockTable";
import { BlockChart } from "../blockChart";
import { bodyBlockDefinitions } from "./bodySection.values";

interface SchemaProps {
    parent: DocumentApp;
}

export type BodySectionBlock =
    | LocalePortableText
    | BlockColumns
    | BlockMedia
    | BlockLinks
    | BlockCards
    | BlockSchedule
    | BlockTable
    | BlockChart;

export default function bodySection({ parent }: SchemaProps) {
    return defineType({
        name: `bodySection${capitalize(parent)}`,
        title: "Content",
        type: "array",
        of: [
            { type: "localePortableTextBody" },
            { type: "blockColumns" },
            { type: "blockMedia" },
            { type: "blockLinks" },
            { type: "blockCards" },
            { type: "blockSchedule" },
            { type: "blockTable" },
            { type: "blockChart" }
        ].filter((field) => (bodyBlockDefinitions[parent] ? bodyBlockDefinitions[parent]?.includes(field.type) : true))
    });
}
