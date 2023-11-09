import Link from "next/link";
import { DefaultPropsWithChildren } from "@cs/globals";
import { LinkTyped } from "@cs/data/schemas";
import { prepareLink } from "@cs/data/utils";

export interface LinkWrapperProps extends Partial<DefaultPropsWithChildren> {
    link?: LinkTyped;
    href?: string;
    title?: string;
}

export default function LinkWrapper(props: LinkWrapperProps) {
    const { link, href, lang, children, ...commonProps } = props;

    if (!link) {
        if (href) {
            const externalProps = !href.startsWith("/")
                ? {
                      target: "_blank",
                      rel: "noreferrer noopener nofollow"
                  }
                : {};
            return (
                <a href={lang && href.startsWith("/") ? `/${lang}${href}` : href} {...externalProps} {...commonProps}>
                    {children}
                </a>
            );
        }
        return <span {...commonProps}>{children}</span>;
    }

    const linkType = link.type;
    const url = prepareLink(link, lang);

    if (url) {
        if (linkType === "external" || linkType === "file") {
            return (
                //External
                <a href={url} target="_blank" rel="noreferrer noopener nofollow" {...commonProps}>
                    {children}
                </a>
            );
        } else if (linkType === "internal" || linkType === "reference") {
            return (
                //Internal
                <Link href={url} {...commonProps}>
                    {children}
                </Link>
            );
        }
        return (
            <a href={url} {...commonProps}>
                {children}
            </a>
        );
    }

    return <span {...commonProps}>{children}</span>;
}
