export type PaginatedReturn<T> = {
    results: T[],
    totalDocs: number,
    page: number,
    totalPages: number,
    hasNext: boolean,
    hasPrev: boolean
}