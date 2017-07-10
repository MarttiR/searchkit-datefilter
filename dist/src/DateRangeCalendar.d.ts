/// <reference types="react" />
import { SearchkitComponent } from "searchkit";
export declare class Picker extends SearchkitComponent<any, any> {
    render(): JSX.Element;
}
export declare class DateRangeCalendar extends SearchkitComponent<any, any> {
    constructor(props: any);
    onStartOpenChange: (startOpen: any) => void;
    onEndOpenChange: (endOpen: any) => void;
    onStartChange: (value: any) => void;
    onEndChange: (value: any) => void;
    clearState: () => void;
    disabledPastDate: (endValue: any) => boolean;
    disabledStartDate: (endValue: any) => boolean;
    handleChange: (value: any) => void;
    render(): JSX.Element;
}
