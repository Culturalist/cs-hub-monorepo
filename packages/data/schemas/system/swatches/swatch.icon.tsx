export interface SwatchIconProps {
    color: string;
}

export function SwatchIcon({ color }: SwatchIconProps) {
    return <div style={{ color: "#FFFFFF", backgroundColor: color, width: "100%", height: "100%" }} />;
}
