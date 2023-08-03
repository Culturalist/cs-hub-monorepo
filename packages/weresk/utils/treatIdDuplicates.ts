import { BlockTemplate } from 'data/types';

export function treatIdDuplicates<T extends BlockTemplate>(input: T[]): T[] {
    //Find and fix blockId duplicates
    let uniqueIds: Record<string, number> = {};
    let output = input.map(block => {
        if (block.blockId) {
            if (Object.keys(uniqueIds).includes(block.blockId.current)) {
                uniqueIds[block.blockId.current] += 1;
                return { ...block, blockId: `${block.blockId}-${uniqueIds[block.blockId.current]}` };
            } else {
                uniqueIds[block.blockId.current] = 1;
                return block;
            }
        }
        return block;
    });

    return output;
}
