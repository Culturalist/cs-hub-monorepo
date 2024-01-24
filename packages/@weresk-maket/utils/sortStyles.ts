export default function sortStyles(styles: object): object {
    return Object.fromEntries(
        Object.entries(styles).sort((a, b) => {
            const firstCompare = a[0].charAt(0).localeCompare(b[0].charAt(0));
            if (!firstCompare) {
                const isDigit = /\d+/g;
                const aNum = a[0].match(isDigit)?.[0];
                const bNum = b[0].match(isDigit)?.[0];
                if (aNum && bNum) {
                    return parseInt(aNum) - parseInt(bNum);
                }
            }
            return firstCompare;
        })
    );
}
