import Script from 'next/script';
import globalConfig from 'globals/globalConfig';

interface GoogleTagProps {
    appName: string;
}

export default function GoogleTag(props: GoogleTagProps) {
    const { appName } = props;
    const id = globalConfig.apps[appName]?.googleTag;
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
