import type { Viewport } from "next";
import { DefaultLayoutProps } from "@cs/globals";

export const viewport: Viewport = {
    width: 512,
    userScalable: false
};

export default function RootLayout({ children }: DefaultLayoutProps) {
    return <>{children}</>;
}
