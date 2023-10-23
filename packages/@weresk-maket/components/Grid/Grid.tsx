"use client";
import "./Grid.styles.css";
import { useHotkeys } from "react-hotkeys-hook";
import { useState } from "react";

type ShowState = "off" | "grid";

interface GridProps {
    className?: string;
}

export default function Grid(props: GridProps) {
    const { className } = props;
    const [showGrid, setShowGrid] = useState<ShowState>("off");
    useHotkeys("shift+g", () => {
        setShowGrid((prev) => {
            if (prev === "off") return "grid";
            return "off";
        });
    });

    if (showGrid !== "off") {
        return (
            <div className={`maket-grid-container ${className || ""}`}>
                <div className="maket-grid-rows"></div>
                <div className="maket-grid-columns">
                    {[...new Array(24)].map((x, i) => (
                        <div className="maket-grid-column" key={i}></div>
                    ))}
                </div>
                <div className="maket-grid-units"></div>
            </div>
        );
    }
    return null;
}
