import { defineArrayMember, defineField, defineType } from "@sanity/types";
import { ThLargeIcon } from "@sanity/icons";
import { CardsType, cardsTypeList, CardPart, personCardParts } from "./blockCards.values";
import { capitalize, appConfig } from "@cs/globals";
import { CardManual } from "../cardManual";
import { Person, Post, Project, Event, Organisation, Page } from "../../documents";
import { Label } from "../../system";

export type CardSource = Project | Post | Person | Event | Organisation;
export type Card = CardManual | CardSource;

export interface BlockCards {
    _type: "blockCards";
    type: CardsType;
    manual?: CardManual[];
    projects?: (Project | Label | Page)[];
    posts?: (Post | Label | Page)[];
    people?: (Person | Label | Page)[];
    events?: (Event | Label | Page)[];
    organisations?: (Organisation | Label)[];
    monochromePhoto?: boolean;
    includePerson?: CardPart[];
    coverOnHover?: boolean;
    displayDates?: boolean;
    showLabels?: boolean;
}

export default function blockCards() {
    return defineType({
        name: "blockCards",
        title: "Cards",
        type: "object",
        fields: [
            defineField({
                name: "type",
                title: "Type",
                type: "string",
                initialValue: "manual",
                options: {
                    list: cardsTypeList
                        .filter(({ docType }) => ["manual", ...appConfig.schemas.documents].includes(docType))
                        .map((cardType) => ({
                            title: cardType.title,
                            value: cardType.value
                        })),
                    layout: "radio",
                    direction: "horizontal"
                },
                validation: (Rule) => Rule.required()
            }),
            ...cardsTypeList
                .filter(({ docType }) => ["manual", ...appConfig.schemas.documents].includes(docType))
                .map(({ value, title, docType }) => {
                    if (value === "manual") {
                        return defineField({
                            name: "manual",
                            title: "Manual",
                            type: "array",
                            of: [
                                {
                                    type: "cardManual"
                                }
                            ],
                            hidden: ({ parent }: { parent: BlockCards | undefined }) => parent?.type !== "manual"
                        });
                    }

                    return defineField({
                        name: value,
                        title,
                        type: "array",
                        description: `Select ${value} individually or filter by label${
                            !(value === "organisations" || value === "people") ? " / parent page" : ""
                        }`,
                        of: [
                            defineArrayMember({
                                name: value,
                                title: capitalize(docType),
                                type: "reference",
                                to: [{ type: docType }],
                                options: {
                                    disableNew: true
                                }
                            }),
                            defineArrayMember({
                                name: "label",
                                title: "Label",
                                type: "reference",
                                to: [{ type: "label" }],
                                options: {
                                    disableNew: true
                                }
                            }),
                            ...(!(value === "organisations" || value === "people")
                                ? [
                                      defineArrayMember({
                                          name: "page",
                                          title: "Parent page",
                                          type: "reference",
                                          to: [{ type: "page" }],
                                          options: {
                                              disableNew: true
                                          }
                                      })
                                  ]
                                : [])
                        ],
                        hidden: ({ parent }: { parent: BlockCards | undefined }) => parent?.type !== value
                    });
                }),
            // Options
            defineField({
                name: "includePerson",
                title: "Include",
                type: "array",
                description: "Select information to include in card",
                of: [{ type: "string" }],
                initialValue: ["subtitle"],
                options: {
                    list: personCardParts,
                    layout: "grid"
                },
                hidden: ({ parent }: { parent: BlockCards | undefined }) => parent?.type !== "people"
            }),
            defineField({
                name: "monochromePhoto",
                title: "Make photos monochrome",
                type: "boolean",
                initialValue: false,
                hidden: ({ parent }: { parent: BlockCards | undefined }) => parent?.type !== "people"
            }),
            defineField({
                name: "coverOnHover",
                title: "Show cards cover only on hover",
                type: "boolean",
                initialValue: false,
                hidden: ({ parent }: { parent: BlockCards | undefined }) => parent?.type !== "manual"
            }),
            defineField({
                name: "displayDates",
                title: "Display each date as separate card",
                type: "boolean",
                initialValue: false,
                hidden: ({ parent }: { parent: BlockCards | undefined }) => parent?.type !== "events"
            }),
            defineField({
                name: "showLabels",
                title: "Show labels",
                type: "boolean",
                initialValue: false,
                hidden: ({ parent }: { parent: BlockCards | undefined }) => parent?.type !== "projects"
            })
        ],
        preview: {
            select: {
                cardType: "type"
            },
            prepare({ cardType }) {
                return {
                    title: capitalize(cardType) || "Cards",
                    subtitle: cardType ? "Cards" : ""
                };
            }
        },
        icon: ThLargeIcon
    });
}
