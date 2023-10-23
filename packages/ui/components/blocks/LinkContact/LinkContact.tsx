import { LinkContact } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { capitalize } from "@cs/globals/utils";
import { localizeString } from "@cs/data/utils";
import LinkWrapper from "../LinkWrapper";

interface LinkContactProps extends DefaultProps {
    link: LinkContact;
}

export default function LinkContact(props: LinkContactProps) {
    const { link, lang, className } = props;

    let caption = capitalize(link.type);
    if (link.type === "website") {
        caption = localizeString(link.caption, lang) || caption;
    } else if (link.type === "email") {
        caption = link.url?.replace("mailto:", "") || caption;
    } else if (link.type === "phone" && link.phone) {
        caption = link.phone;
    }

    return (
        <LinkWrapper href={link.url} className={className}>
            <span>{caption}</span>
        </LinkWrapper>
    );
}
