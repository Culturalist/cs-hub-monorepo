import { appConfig } from "@cs/globals";
import dictionary from "../values/dictionary";

const initialValueTemplates = [
    {
        id: "post-with-initial",
        title: "Post",
        schemaType: "post",
        parameters: [],
        value: () => ({
            parent: appConfig.parentDocuments?.post
                ? { _type: "reference", _ref: appConfig.parentDocuments.post }
                : undefined
        })
    },
    {
        id: "post-with-parent",
        title: "Post",
        schemaType: "post",
        parameters: [{ name: "parentId", type: "string" }],
        value: (params: { parentId: string }) => ({
            parent: { _type: "reference", _ref: params.parentId }
        })
    },
    {
        id: "project-with-initial",
        title: "Project",
        schemaType: "project",
        parameters: [],
        value: () => ({
            parent: appConfig.parentDocuments?.project
                ? {
                      _type: "reference",
                      _ref: appConfig.parentDocuments.project
                  }
                : undefined
        })
    },
    {
        id: "project-with-parent",
        title: "Project",
        schemaType: "project",
        parameters: [{ name: "parentId", type: "string" }],
        value: (params: { parentId: string }) => ({
            parent: { _type: "reference", _ref: params.parentId }
        })
    },
    {
        id: "event-with-initial",
        title: "Event",
        schemaType: "event",
        parameters: [],
        value: () => ({
            parent: appConfig.parentDocuments?.event
                ? { _type: "reference", _ref: appConfig.parentDocuments.event }
                : undefined,
            action: {
                _type: "linkCaptioned",
                caption: dictionary.registration,
                link: {
                    _type: "linkTyped",
                    type: "external",
                    href: appConfig.tokens?.registration || ""
                }
            }
        })
    },
    {
        id: "event-with-parent",
        title: "Event",
        schemaType: "event",
        parameters: [{ name: "parentId", type: "string" }],
        value: (params: { parentId: string }) => ({
            parent: { _type: "reference", _ref: params.parentId }
        })
    },
    {
        id: "page-with-initial",
        title: "Page",
        schemaType: "page",
        value: () => ({})
    },
    {
        id: "person-with-initial",
        title: "Person",
        schemaType: "person",
        value: () => ({})
    },
    {
        id: "note-with-initial",
        title: "Note",
        schemaType: "note",
        value: () => ({})
    },
    {
        id: "organisation-with-initial",
        title: "Organisation",
        schemaType: "organisation",
        value: () => ({})
    },
    {
        id: "palette-with-initial",
        title: "Palette",
        schemaType: "palette",
        value: () => ({})
    },
    {
        id: "label-with-initial",
        title: "Label",
        schemaType: "label",
        value: () => ({})
    }
];

export default initialValueTemplates;
