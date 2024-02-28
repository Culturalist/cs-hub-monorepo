module.exports = {
    reactStrictMode: true,
    transpilePackages: ["@cs/globals", "@cs/data", "@cs/ui", "@weresk/core", "@weresk/maket"],
    async redirects() {
        return [
            // Pages
            {
                source: "/juhlarahasto",
                destination: "https://www.juhlarahasto.fi/",
                permanent: true
            },
            {
                source: "/ru/juhlarahasto-r",
                destination: "https://www.juhlarahasto.fi/",
                permanent: true
            },
            {
                source: "/media-ja-luottamus",
                destination: "/blogit/venajankieliset-ja-suomalainen-media",
                permanent: true
            },
            // Projects
            {
                source: "/tunteeko-suomen-media-lukijansa",
                destination: "https://instituutiot.culturas.fi/projektit/luottamuksen-illuusio",
                permanent: true
            },
            {
                source: "/hankkeemme/cultura-week",
                destination: "https://www.culturaweek.fi/",
                permanent: true
            },
            {
                source: "/hankkeemme/utvis",
                destination: "https://instituutiot.culturas.fi/projektit/utvis-hanke",
                permanent: true
            },
            {
                source: "/hankkeemme/culturalist",
                destination: "https://venajankieliset.culturas.fi/projektit/culturalist",
                permanent: true
            },
            {
                source: "/hankkeemme/luottamuksen-illuusio",
                destination: "https://instituutiot.culturas.fi/projektit/luottamuksen-illuusio",
                permanent: true
            },
            {
                source: "/hankkeemme/kielivahemmistoselvitys-2022",
                destination:
                    "https://instituutiot.culturas.fi/projektit/turun-kaupunginteatterin-muun-kuin-suomenkielisista-asiakkaista",
                permanent: true
            },
            {
                source: "/hankkeemme/suomen-venajankieliset-2022",
                destination: "https://instituutiot.culturas.fi/projektit/suomen-venajankieliset-2022-selvitys",
                permanent: true
            },
            {
                source: "/hankkeemme/agents-of-change",
                destination: "https://venajankieliset.culturas.fi/projektit/mem",
                permanent: true
            },
            {
                source: "/hankkeemme/culturalab",
                destination: "https://instituutiot.culturas.fi/projektit/culturalab",
                permanent: true
            },
            {
                source: "/hankkeemme/culturallab_museot-participation",
                destination: "https://instituutiot.culturas.fi/projektit/culturalab",
                permanent: true
            },
            {
                source: "/hankkeemme/culturafest",
                destination: "https://venajankieliset.culturas.fi/projektit/culturafest",
                permanent: true
            },
            {
                source: "/hankkeemme/culturalab_museot-mediation",
                destination: "https://instituutiot.culturas.fi/projektit/culturalab",
                permanent: true
            },
            {
                source: "/ru/proekty/culturalist_r",
                destination: "https://venajankieliset.culturas.fi/ru/projektit/culturalist",
                permanent: true
            },
            {
                source: "/ru/proekty/agents-of-change-ru",
                destination: "https://venajankieliset.culturas.fi/ru/projektit/mem",
                permanent: true
            },
            {
                source: "/ru/proekty/culturafest-2",
                destination: "https://venajankieliset.culturas.fi/ru/projektit/culturafest",
                permanent: true
            },
            // Blog
            {
                source: "/ru/blogi/sani-kontula-webb-aloitti-cultura-saation-johdossa",
                destination: "/blogit/saation-uusi-johtaja-on-sani-kontula-webb",
                permanent: true
            },
            {
                source: "/blogi/syrjintakokemukset-tekevat-kyyniseksi-politiikkaa-kohtaan",
                destination:
                    "/blogit/syrjinta-rapauttaa-yhteiskuntamme-perustaa-ja-haastaa-suomen-poliittista-jarjestelmaa",
                permanent: true
            },
            {
                source: "/blogi/syrjinta-rapauttaa-yhteiskuntamme",
                destination: "/blogit/syrjintakokemukset-tekevat-kyyniseksi-politiikkaa-kohtaan",
                permanent: true
            },
            {
                source: "/blogi/oppia-jalkapallojoukkueesta",
                destination: "/blogit/oppia-jalkapallojoukkueesta",
                permanent: true
            },
            {
                source: "/blogi/median-sokea-piste",
                destination: "/blogit/median-sokea-piste",
                permanent: true
            },
            {
                source: "/blogi/venajankieliset-ja-suomalainen-media",
                destination: "/blogit/venajankieliset-ja-suomalainen-media",
                permanent: true
            },
            {
                source: "/blogi/integraation-edistaminen-virossa-ja-suomessa",
                destination: "/blogit/kotoutuminen-kielen-ja-kulttuurin-vaiko-tyon-kautta",
                permanent: true
            },
            {
                source: "/blogi/taidevalitys-lisaa-osallisuutta-ja-vahvistaa-demokratiaa",
                destination: "/blogit/taidevalitys-lisaa-osallisuutta-ja-vahvistaa-demokratiaa",
                permanent: true
            },
            {
                source: "/blogi/apurahatarina-venajaa-verkossa",
                destination: "https://www.juhlarahasto.fi/blogit/venajaa-verkossa",
                permanent: true
            },
            {
                source: "/blogi/apurahatarina-kielimatka",
                destination: "https://www.juhlarahasto.fi/blogit/kielimatka-latviaan-ja-liettuaan",
                permanent: true
            },
            {
                source: "/blogi/kohti-luottamusta-kasvatuskumppanuudessa",
                destination: "/blogit/kohti-luottamusta-kasvatuskumppanuudessa",
                permanent: true
            },
            {
                source: "/blogi/apurahatarina-teatteri",
                destination: "https://www.juhlarahasto.fi/blogit/teatteria-petroskoissa",
                permanent: true
            },
            {
                source: "/blogi/apurahatarina-kauhu",
                destination: "https://www.juhlarahasto.fi/blogit/apurahatarina-naisten-kirjoittamaa-kauhua",
                permanent: true
            },
            {
                source: "/blogi/1653",
                destination: "https://www.juhlarahasto.fi/blogit/opintomatka-repin-nayttelyyn",
                permanent: true
            },
            {
                source: "/blogi/tarina1",
                destination: "https://www.juhlarahasto.fi/blogit/musiikin-kautta-venajaan",
                permanent: true
            },
            {
                source: "/blogi/kasvatuskumppanuus-kahden-kulttuurin-rajapinnassa",
                destination: "/blogit/kasvatuskumppanuus-kahden-kulttuurin-rajapinnassa",
                permanent: true
            },
            {
                source: "/blogi/culturalistin-algoritmeja-2",
                destination: "/blogit/ulturalistin-algoritmeja",
                permanent: true
            },
            {
                source: "/blogi/koronakriisin-aikaisen-tiedonsaannin-selvittaminen-osoittautui-haasteelliseksi",
                destination: "/blogit/koronakriisin-aikaisen-tiedonsaannin-selvittaminen-osoittautui-haasteelliseksi",
                permanent: true
            },
            {
                source: "/blogi/article-1",
                destination: "/blogit/jarjestot-valittavat-tietoa-koronavirukseen-liittyen",
                permanent: true
            },
            {
                source: "/blogi/article-1-2",
                destination: "/blogit/muutos-lahtee-kasitteista",
                permanent: true
            },
            {
                source: "/blogi/:slug",
                destination: "/blogit/:slug",
                permanent: true
            }
            // {
            //     source: "/old-blog/:slug",
            //     destination: "/news/:slug",
            //     permanent: true
            // },
            // {
            //     source: "/:path((?!uk/).*)",
            //     has: [
            //         {
            //             type: "header",
            //             key: "x-vercel-ip-country",
            //             value: "GB"
            //         }
            //     ],
            //     permanent: false,
            //     destination: "/uk/:path*"
            // }
        ];
    }
};
