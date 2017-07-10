export interface DateRangeQueryOptions {
    lt?: number | string;
    lte?: number | string;
    gt?: number | string;
    gte?: number | string;
    boost?: number;
    format?: string;
    time_zone?: string;
}
export declare function DateRangeQuery(key: any, options: DateRangeQueryOptions): {
    range: {
        [x: number]: DateRangeQueryOptions;
    };
};
