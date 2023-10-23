"use client";
import { Flex, Inline } from "@sanity/ui";
// import { EyeOpenIcon } from '@sanity/icons';

// const previewToken = process.env.NEXT_PUBLIC_PREVIEW_TOKEN || '';

export default function ToolMenuApp(props: any) {
    return (
        <Flex justify="space-between" align="center">
            <Inline space={2}>
                {/* eslint-disable-next-line */}
                {props.renderDefault(props)}
                {/* <Button
                    as="a"
                    icon={EyeOpenIcon}
                    mode="bleed"
                    text="Preview"
                    href={`/api/draft?token=${previewToken}`}
                    target="_blank"
                /> */}
                {/* <DeployWidget /> */}
            </Inline>
        </Flex>
    );
}
