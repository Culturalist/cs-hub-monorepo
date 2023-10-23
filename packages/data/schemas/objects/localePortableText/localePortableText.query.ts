import { groq } from "next-sanity";
import { portableTextSegment } from "../portableText";

export const localePortableTextSegment = groq`
    fi[] {
        ${portableTextSegment}
    },
    ru[] {
        ${portableTextSegment}
    },
    en[] {
        ${portableTextSegment}
    }
`;
