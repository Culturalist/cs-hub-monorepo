'use client';
import React from 'react';
import { Button } from '@sanity/ui';
import { UploadIcon, ClockIcon } from '@sanity/icons';
import { useState } from 'react';

const hookId = process.env.NEXT_PUBLIC_VERCEL_HOOK_ID;
const hookUrl = `https://api.vercel.com/v1/integrations/deploy/${hookId}`;

async function postWebhook() {
    try {
        const response = await fetch(hookUrl, {
            method: 'GET'
        });
        console.log(response);
        return response.ok;
    } catch (error) {
        console.error('I have no idea what went wrong, read it by yourself:', error);
    }
    return false;
}

export default function DeployWidget() {
    const [triggered, setTriggered] = useState(false);

    async function handleClick() {
        if (!triggered) {
            const result = await postWebhook();
            setTriggered(result);
        }
    }

    return (
        <Button
            onClick={handleClick}
            mode="bleed"
            icon={triggered ? ClockIcon : UploadIcon}
            text={triggered ? 'Deploying...' : 'Deploy'}
            disabled={triggered ? true : false}
        />
    );
}
