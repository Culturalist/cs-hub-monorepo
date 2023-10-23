export type BlockParent = 'body' | 'column' | 'field';
export type PortableTextDefinition = 'styles' | 'lists' | 'annotations' | 'blocks';
export type PortableTextElements = Record<PortableTextDefinition, Record<BlockParent, string[]>>;

export const portableTextParents: BlockParent[] = ['body', 'column', 'field'];
export const portableTextDefinitions: PortableTextElements = {
    styles: {
        body: ['normal', 'h3', 'h4', 'lead', 'small'],
        column: ['normal', 'h3', 'h4', 'small'],
        field: ['normal']
    },
    lists: {
        body: ['bullet', 'number'],
        column: ['bullet', 'number'],
        field: []
    },
    annotations: {
        body: ['link'],
        column: ['link'],
        field: ['link']
    },
    blocks: {
        body: ['mediaImage'],
        column: ['mediaImage'],
        field: []
    }
};
