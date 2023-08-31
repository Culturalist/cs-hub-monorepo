import { localizeString } from 'data/utils';
import { Organisation } from 'data/schemas';
import { DefaultProps } from 'globals';
import globalConfig from 'globals/globalConfig';
import { getImageUrl } from 'globals/lib/sanity';
import LinkWrapper from '../../LinkWrapper';
import { createStyles } from './CardOrganisation.styles';

interface CardOrganisationProps extends DefaultProps {
    data: Organisation;
}

export default function CardOrganisation(props: CardOrganisationProps) {
    const { data, lang, className } = props;
    const { logo, url } = data;
    const name = localizeString(data.title, lang);
    const logoUrl = logo && getImageUrl(logo, globalConfig.breakpoints.xs);

    const styles = createStyles({ className });

    return (
        <LinkWrapper href={url} title={name} className={styles.container}>
            <img src={logoUrl} alt={name} className={styles.image} />
        </LinkWrapper>
    );
}
