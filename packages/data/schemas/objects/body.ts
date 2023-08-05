import { defineType } from 'sanity';
import { capitalize } from 'weresk/utils';
import { DocumentAny } from '../values';

export default function body(parent: DocumentAny) {
    return defineType({
        name: `body${capitalize(parent)}`,
        title: 'Body',
        type: 'array',
        of: [{ type: 'blockSection' }]
    });
}
