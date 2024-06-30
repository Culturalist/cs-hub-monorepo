export interface PaletteIconProps {
    surface: string;
    text: string;
    textLight: string;
    cardSurface: string;
    cardText: string;
}

export function PaletteIcon({ surface, text, textLight, cardSurface, cardText }: PaletteIconProps) {
    return (
        <div
            style={{
                width: "100%",
                maxHeight: "40px",
                padding: "4px",
                paddingTop: "1px",
                display: "flex",
                flexDirection: "column",
                backgroundColor: surface
            }}
        >
            <div
                style={{
                    color: text,
                    fontWeight: 500,
                    fontSize: "16px"
                }}
            >
                A
                <span
                    style={{
                        color: textLight
                    }}
                >
                    a
                </span>
            </div>
            <div
                style={{
                    width: "12px",
                    height: "12px",
                    color: cardText,
                    backgroundColor: cardSurface
                }}
            ></div>
        </div>
    );
}
