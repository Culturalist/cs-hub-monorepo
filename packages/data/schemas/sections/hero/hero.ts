import { defineType, defineField } from "@sanity/types";
import { actionTypeList, HeroActionType } from "./hero.values";
import { LocaleString, CardManual, LinkCaptioned, CoverBlock } from "../../objects";
import type { Palette } from "@weresk/maket";

export interface Hero {
    _type: "hero";
    covers?: CoverBlock[];
    lead?: LocaleString;
    actionType: HeroActionType;
    cards?: CardManual[];
    links?: LinkCaptioned[];
    palette?: Palette;
    coverOnHover?: boolean;
    hideFooter?: boolean;
}

export default function hero() {
    return defineType({
        name: "hero",
        title: "Hero",
        type: "object",
        fieldsets: [
            {
                name: "style",
                title: "Style",
                options: {
                    collapsible: true,
                    collapsed: true
                }
            }
        ],
        fields: [
            defineField({
                name: "covers",
                title: "Covers",
                type: "coverArray"
            }),
            defineField({
                name: "lead",
                title: "Lead",
                type: "localeString"
            }),
            defineField({
                name: "actionType",
                title: "Action type",
                type: "string",
                initialValue: "cards",
                options: {
                    list: actionTypeList,
                    layout: "radio",
                    direction: "horizontal"
                },
                validation: (Rule) => Rule.required()
            }),
            defineField({
                name: "cards",
                title: "Cards",
                type: "array",
                of: [{ type: "cardManual" }],
                description: "Up to 3 cards may be added",
                validation: (Rule) => Rule.max(3),
                hidden: ({ parent }) => parent?.actionType !== "cards"
            }),
            defineField({
                name: "links",
                title: "Links",
                type: "array",
                of: [{ type: "linkCaptioned" }],
                description: "Up to 3 links may be added",
                validation: (Rule) => Rule.max(3),
                hidden: ({ parent }) => !(parent?.actionType == "links" || parent?.actionType == "buttons")
            }),
            defineField({
                name: "palette",
                title: "Hero palette",
                type: "reference",
                description: "If not set – default website palette will be used",
                to: [{ type: "palette" }],
                fieldset: "style"
            }),
            defineField({
                name: "coverOnHover",
                title: "Show cards cover only on hover",
                type: "boolean",
                initialValue: false,
                fieldset: "style",
                hidden: ({ parent }) => parent?.actionType !== "cards"
            }),
            defineField({
                name: "hideFooter",
                title: "Hide footer on main page",
                type: "boolean",
                initialValue: false,
                fieldset: "style"
            })
        ]
    });
}
