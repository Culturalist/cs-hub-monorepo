import React from 'react';

interface PreviewAlertProps {
    preview?: boolean;
    loading?: boolean;
}

export default function PreviewAlert({ preview, loading }: PreviewAlertProps) {
    if (preview) {
        return (
            <div className="fixed z-[1000] left-0 bottom-0 w-full flex flex-row justify-between p-16 gap-40 items-center text-white bg-blue">
                <span className="trim-cap whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {loading ? 'Loading page preview... ' : `You're viewing page in a preview mode.`}
                </span>
                <a href="/api/draft-disable" className="trim-cap text-sm hover:opacity-80 flex-none">
                    Exit preview mode
                </a>
            </div>
        );
    }
    return null;
}
