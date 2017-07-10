import * as moment from "moment";
import { ObjectState, FieldOptions, FieldContext, FilterBasedAccessor } from "searchkit";
export interface DateRangeAccessorOptions {
    title: string;
    id: string;
    fromDate: moment.Moment;
    toDate: moment.Moment;
    interval?: number;
    fromDateField: string;
    toDateField: string;
    loadHistogram?: boolean;
    fieldOptions?: FieldOptions;
    rangeFormatter?: (count: number) => number | string;
    onClearState?: (newValue?: any) => any;
}
export declare class DateRangeAccessor extends FilterBasedAccessor<ObjectState> {
    options: DateRangeAccessorOptions;
    state: ObjectState;
    fieldContext: FieldContext;
    rangeFormatter: (count: number) => number | string;
    constructor(key: any, options: DateRangeAccessorOptions);
    clearState: () => void;
    fromQueryObject(ob: any): void;
    getQueryObject(): {
        [x: string]: number;
    };
    buildSharedQuery(query: any): any;
    getBuckets(): any;
    isDisabled(): boolean;
    buildOwnQuery(query: any): any;
}
