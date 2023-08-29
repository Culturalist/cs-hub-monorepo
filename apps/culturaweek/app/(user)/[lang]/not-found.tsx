import dictionary from 'data/dictionary';
import globalConfig from 'globals/globalConfig';
import { localizeString } from 'data/utils';
import app from '../../../app.json';

const { appName } = app;

export default function NotFound() {
    return (
        <div className="h-hero-height flex flex-col justify-center items-center gap-gutter">
            <h2 className="typo-caps-3xl text-outline">404</h2>
            <p>{localizeString(dictionary['404'], globalConfig.localization.default || 'en')}</p>
        </div>
    );
}
