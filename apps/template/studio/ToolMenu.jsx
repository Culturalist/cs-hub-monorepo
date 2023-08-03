import { Flex, Button, Inline } from '@sanity/ui';
import { EyeOpenIcon } from '@sanity/icons';
import { DeployWidget } from 'globals/lib/sanity';

const previewToken = process.env.NEXT_PUBLIC_PREVIEW_TOKEN || '';

export default function ToolMenu(props) {
    return (
        <Flex justify="space-between" align="center">
            <Inline space={2}>
                {props.renderDefault(props)}
                {/* <Button
                    as="a"
                    icon={EyeOpenIcon}
                    mode="bleed"
                    text="Preview"
                    href={`/api/draft?token=${previewToken}`}
                    target="_blank"
                /> */}
                <DeployWidget />
            </Inline>
        </Flex>
    );
}
