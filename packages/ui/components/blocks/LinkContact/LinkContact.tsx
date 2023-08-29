import { LinkContact } from 'data/schemas';
import { DefaultProps } from 'globals';
import { capitalize } from 'weresk/utils';
import { localizeString } from 'data/utils';
import LinkWrapper from '../LinkWrapper';

interface LinkContactProps extends DefaultProps {
    link: LinkContact;
}

export default function LinkContact(props: LinkContactProps) {
    const { link, lang, className } = props;

    let caption = capitalize(link.type);
    if (link.type == 'website') {
        caption = localizeString(link.caption, lang) || caption;
    } else if (link.type == 'email') {
        caption = link.url?.replace('mailto:', '') || caption;
    } else if (link.type == 'phone' && link.phone) {
        caption = link.phone;
    }

    return (
        <LinkWrapper href={link.url} className={className}>
            <span>{caption}</span>
        </LinkWrapper>
    );
}
