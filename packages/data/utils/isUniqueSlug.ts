import { globalConfig } from "@cs/globals";
import { SlugValidationContext } from "@sanity/types";

export async function isUniqueSlug(slug: string, context: SlugValidationContext): Promise<boolean> {
    const { document, getClient } = context;
    const type = document?._type;
    const client = getClient({ apiVersion: globalConfig.latestUpdate });
    const id = document?._id.replace(/^drafts\./, "");
    const params = {
        draft: `drafts.${id}`,
        published: id,
        slug,
        type
    };
    const query = `!defined(*[!(_id in [$draft, $published]) && _type == $type && slug.current == $slug][0]._id)`;
    const result = await client.fetch<boolean>(query, params);
    return result;
}
