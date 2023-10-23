import Script from "next/script";
import { appConfig } from "@cs/globals";

interface GoogleTagProps {}

export default function GoogleTag(props: GoogleTagProps) {
    const id = appConfig.tokens?.googleTag;
    if (!id) return null;

    return (
        <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
            <Script id="google-analytics">
                {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
    
            gtag('config', '${id}');
            `}
            </Script>
        </>
    );
}
