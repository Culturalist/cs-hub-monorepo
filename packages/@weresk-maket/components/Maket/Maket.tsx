import { DefaultPropsWithChildren } from "@weresk/core";
import TypoInit from "../TypoInit";
import Grid from "../Grid";

interface MaketProps extends DefaultPropsWithChildren {
    debug?: boolean;
}

export default function Maket(props: MaketProps) {
    const { lang, debug, children } = props;
    return (
        <html lang={lang} data-useragent="hhea">
            {children}
            <TypoInit />
        </html>
    );
}

Maket.Grid = Grid;
