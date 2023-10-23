module.exports = {
    swatches: {
        white: "255 255 255",
        black: "50 50 50",
        blue: "44 44 227",
        green: "60 80 60",
        "sky-blue": "160 193 245",
        grey: "153 153 153"
    },
    palette: ({ theme }) => ({
        surface: theme("swatches.white"),
        "on-surface": theme("swatches.black"),
        "on-surface-light": theme("swatches.grey"),
        primary: theme("swatches.blue"),
        "on-primary": theme("swatches.white"),
        "header-text": theme("swatches.black")
    })
};
