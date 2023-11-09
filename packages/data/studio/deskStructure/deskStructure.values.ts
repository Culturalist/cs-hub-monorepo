import { HomeIcon, DocumentsIcon, PresentationIcon, UsersIcon, CalendarIcon, CaseIcon } from "@sanity/icons";
import { DocumentApp } from "@cs/globals";

export type DeskValues = Record<DocumentApp, { icon: any; title: string }>;

const deskValues: DeskValues = {
    app: {
        icon: HomeIcon,
        title: "Home"
    },
    page: {
        icon: DocumentsIcon,
        title: "Pages"
    },
    person: {
        icon: UsersIcon,
        title: "People"
    },
    post: {
        icon: DocumentsIcon,
        title: "Posts"
    },
    project: {
        icon: PresentationIcon,
        title: "Projects"
    },
    event: {
        icon: CalendarIcon,
        title: "Events"
    },
    note: {
        icon: DocumentsIcon,
        title: "Notes"
    },
    organisation: {
        icon: CaseIcon,
        title: "Organisations"
    }
};

export default deskValues;
