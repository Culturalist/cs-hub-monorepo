import { BodyBlock, BodySectionBlock } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { Links } from "../Links";
import { PortableText } from "../PortableText";
import { BlockCards } from "./BlockCards";
import { BlockColumns } from "./BlockColumns";
import { BlockMedia } from "./BlockMedia";
import { BlockSchedule } from "./BlockSchedule";
import { BlockSection } from "./BlockSection";
import { BlockChart } from "./BlockChart";
import { BlockTable } from "./BlockTable";
import { createStyles } from "./Body.styles";

interface BodyProps extends DefaultProps {
    data?: (BodyBlock | BodySectionBlock)[];
}

export default function Body(props: BodyProps) {
    const { data, lang, className } = props;
    if (!data || data.length === 0) return null;

    const styles = createStyles({ className });

    return (
        <div className={styles.container}>
            {data.map((block, i) => {
                const blockProps = {
                    lang,
                    className: styles.block
                };
                if (block._type === "blockColumns") {
                    return <BlockColumns data={block} key={i} {...blockProps} />;
                } else if (block._type === "blockLinks") {
                    return (
                        <Links links={block.links} layout={block.layout} key={i} lang={lang} className={styles.links} />
                    );
                } else if (block._type === "blockSchedule") {
                    return <BlockSchedule data={block} key={i} {...blockProps} />;
                } else if (block._type === "blockMedia") {
                    return <BlockMedia data={block} key={i} {...blockProps} />;
                } else if (block._type === "blockCards") {
                    return <BlockCards data={block} key={i} {...blockProps} />;
                } else if (block._type === "blockChart") {
                    return <BlockChart data={block} key={i} {...blockProps} />;
                } else if (block._type === "blockTable") {
                    return <BlockTable data={block} key={i} {...blockProps} />;
                } else if (block.typeClass === "blockSection") {
                    return <BlockSection data={block} key={i} lang={lang} className={styles.section} />;
                }
                // eslint-disable-next-line
                else if (block.typeClass === "blockText") {
                    return <PortableText data={block} parent="body" key={i} {...blockProps} />;
                }
                return null;
            })}
        </div>
    );
}
