/// <reference types="react" />
import * as React from "react";
import * as moment from "moment";
import { SearchkitComponent, SearchkitComponentProps, RenderComponentType, FieldOptions, Panel } from "searchkit";
import { DateRangeAccessor } from "./DateRangeAccessor";
export declare class DateRangeFilterInput extends SearchkitComponent<any, any> {
    refs: {
        [key: string]: any;
        dateFromInput: any;
        dateToInput: any;
    };
    handleDateFinished: (event: any) => void;
    render(): JSX.Element;
}
export interface DateRangeFilterProps extends SearchkitComponentProps {
    fromDateField: string;
    toDateField: string;
    fromDate?: moment.Moment;
    toDate?: moment.Moment;
    id: string;
    title: string;
    interval?: number;
    containerComponent?: RenderComponentType<any>;
    calendarComponent?: RenderComponentType<any>;
    rangeFormatter?: (count: number) => number | string;
    fieldOptions?: FieldOptions;
}
export declare class DateRangeFilter extends SearchkitComponent<DateRangeFilterProps, any> {
    accessor: DateRangeAccessor;
    static propTypes: any;
    static defaultProps: {
        containerComponent: typeof Panel;
        rangeFormatter: (v: any) => string;
    };
    constructor(props: any);
    defineAccessor(): DateRangeAccessor;
    handleClearState: () => void;
    defineBEMBlocks(): {
        container: string;
        labels: string;
    };
    setCalendarState: (newValues: any) => void;
    calendarUpdate: (newValues: any) => void;
    calendarUpdateAndSearch: (newValues: any) => void;
    getCalendarComponent(): RenderComponentType<any>;
    render(): React.ReactElement<any>;
    renderCalendarComponent(component: RenderComponentType<any>): React.ReactElement<any>;
}
