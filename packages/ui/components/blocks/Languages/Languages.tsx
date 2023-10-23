"use client";
import { usePathname } from "next/navigation";
import { globalConfig, DefaultProps } from "@cs/globals";
import LinkWrapper from "../LinkWrapper";
import { createStyles } from "./Languages.styles";

interface LanguagesProps extends DefaultProps {
    active?: string[];
}

export default function Languages({ lang, active, className }: LanguagesProps) {
    const styles = createStyles({ className });
    const languages =
        active && active.length > 0
            ? globalConfig.localization.languages.filter((language) =>
                  active.includes(language.id)
              )
            : null;
    const pathName = usePathname();
    const slug = pathName ? "/" + pathName.split("/").splice(2).join("/") : "/";

    if (!languages || languages.length <= 1) return <div></div>;

    return (
        <ul className={styles.container}>
            {languages.map((language, i) => {
                return (
                    <li key={i}>
                        {language.id !== lang ? (
                            <LinkWrapper
                                href={slug}
                                lang={language.id}
                                className={styles.link}
                            >
                                <span className={styles.caption}>
                                    {language.abbr}
                                </span>
                            </LinkWrapper>
                        ) : (
                            <span className={styles.caption}>
                                {language.abbr}
                            </span>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
