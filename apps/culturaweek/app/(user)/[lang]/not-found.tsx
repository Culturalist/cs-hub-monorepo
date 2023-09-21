import { dictionary } from 'data/values';
import { selectDefaultLocale } from 'data/utils';

export default function NotFound() {
    return (
        <div className="h-hero-height flex flex-col justify-center items-center gap-gutter">
            <h2 className="typo-caps-3xl text-outline">404</h2>
            <p>{selectDefaultLocale(dictionary['404'])}</p>
        </div>
    );
}
