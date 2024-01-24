import { dictionary } from "@cs/data/values";
import { selectDefaultLocale } from "@cs/data/utils";

export default function NotFound() {
    return (
        <div className="h-hero-height flex flex-col justify-center items-center gap-gutter">
            <h2 className="typo-caps-3xl text-outline lg:text-outline-thick">404</h2>
            <p>{selectDefaultLocale(dictionary["404"])}</p>
        </div>
    );
}
