import globalConfig from 'globals/globalConfig';

export async function isUniqueSlug(slug: string, context: any): Promise<boolean> {
    const { document, getClient } = context;
    const type = document._type;
    const appName = document.app?._ref || '';
    const client = getClient({ apiVersion: globalConfig.latestUpdate });
    const id = document._id.replace(/^drafts\./, '');
    const params = {
        draft: `drafts.${id}`,
        published: id,
        slug,
        type,
        appName
    };
    const query = `!defined(*[!(_id in [$draft, $published]) && _type == $type && slug.current == $slug && (!defined(app) || app._ref == $appName)][0]._id)`;
    const result = await client.fetch(query, params);
    return result;
}
