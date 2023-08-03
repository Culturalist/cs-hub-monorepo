export function getFirstCaption(
    content: Record<string, string & Record<string, string>>[]
): string | undefined {
    let output = undefined;
    if (content?.length > 0) {
        content.reverse().forEach(block => {
            if (block._type == 'blockCaption' && block.caption?.en) {
                output = block.caption.en;
            }
        });
    }
    return output;
}
