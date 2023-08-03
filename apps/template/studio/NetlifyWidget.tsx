import { Button, Inline } from '@sanity/ui';
import { SyncIcon } from '@sanity/icons';
import { useEffect, useState } from 'react';

const siteId = process.env.NEXT_PUBLIC_NETLIFY_SITE_ID;
const siteName = process.env.NEXT_PUBLIC_NETLIFY_SITE_NAME;
const hookId = process.env.NEXT_PUBLIC_NETLIFY_HOOK_ID;
const hookUrl = `https://api.netlify.com/build_hooks/${hookId}`;
const adminUrl = `https://app.netlify.com/sites/${siteName}/overview`;
const badgeUrl = `https://api.netlify.com/api/v1/badges/${siteId}/deploy-status`;

async function postWebhook() {
    try {
        const response = await fetch(hookUrl, {
            method: 'POST'
        });
        console.log(response);
    } catch (error) {
        console.error('I have no idea what went wrong, read it by yourself:', error);
    }
}

export default function NetlifyWidget() {
    const [refresh, setRefresh] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setRefresh(Date.now());
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Inline space={2}>
            <a href={adminUrl} target="_blank">
                <img src={`${badgeUrl}?${refresh}`} alt="Deploy Status" style={{ height: 20 }} />
            </a>
            <Button
                onClick={async () => {
                    await postWebhook();
                }}
                mode="bleed"
                icon={SyncIcon}
                text="Rebuild"
            />
        </Inline>
    );
}
