export const isIn = <FilterType extends string>(
    filter: FilterType[] | boolean | undefined,
    value: string | undefined
) => (Array.isArray(filter) ? filter.includes(value as FilterType) : Boolean(filter));
