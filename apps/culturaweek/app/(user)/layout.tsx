import 'ui/globals.css';
import { DefaultLayoutProps } from 'globals';

export default async function RootLayout({ children }: DefaultLayoutProps) {
    return <>{children}</>;
}
