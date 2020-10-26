import * as React from "react";
import * as moment from "moment";
const styles = require("rc-calendar/assets/index.css");

import {
  SearchkitComponent,
} from "searchkit"

const RangeCalendar = require('rc-calendar/lib/RangeCalendar');

const DatePicker = require('rc-calendar/lib/Picker');
var fr_FR = require('rc-calendar/lib/locale/fr_FR');

const format = 'dddd D. MMMM YYYY';
const fullFormat = 'dddd DD.MM.Y';

const locale = { ...fr_FR, monthFormat: 'MMMM' }
import 'moment/locale/fr';

export class Picker extends SearchkitComponent<any, any> {
  render() {
    const props = this.props;
    const { showValue } = props;
    const calendar = (
      <RangeCalendar
        type={this.props.type}
        locale={locale}
        format={format}
        onChange={props.onChange}
        disabledDate={props.disabledDate}
        showToday={false}
        showOk={false}
        showClear={false}
      />);

    return (
      <DatePicker
        prefixCls="sk-calendar-picker"
        open={this.props.open}
        onOpenChange={this.props.onOpenChange}
        calendar={calendar}
        value={props.value}
        dateFormat={format}
        align={{
          points: ['bl', 'tl']
        }}
      >
        {
          () => (
            <div className="sk-date-box">
              <div className="sk-date-box__label" style={{flex:"1 0 80px"}}>
                {this.props.dateInputPlaceholder}:
              </div>
              <div className="sk-date-box__value" style={{flex:"1 0 50%"}}>
                {moment(showValue).format(fullFormat)}
              </div>
            </div>
          )
        }
      </DatePicker>);
  }
};


export class DateRangeCalendar extends SearchkitComponent<any, any> {
  constructor(props) {
    super(props)
    const { fromDate, toDate } = props
    this.state = {
      startOpen: false,
      endOpen: false,
    }
  }

  onStartOpenChange = (startOpen) => {
    this.setState({
      startOpen,
    });
  }

  onEndOpenChange = (endOpen) => {
    this.setState({
      endOpen,
    });
  }

  onStartChange = (value) => {
    this.setState({
      startValue: value[0],
      startOpen: false,
      endOpen: false,
    });
    this.handleChange(value)
  }

  onEndChange = (value) => {
    this.handleChange(value)
  }

  clearState = () => {
    const { onFinished } = this.props
    this.setState({
      startValue: null,
      endValue: null,
    })
    onFinished({
      fromDate: null,
      toDate: null
    })
  }

  // For disabling past dates
  disabledPastDate = (endValue) => {
    if (endValue.diff(moment(), 'days') < 0) {
      return true
    }
    return false
  }

  disabledStartDate = (endValue) => {
    if (!endValue) {
      return false;
    }
    const startValue = this.state.startValue;
    if (!startValue) {
      return false;
    }
    return endValue.diff(startValue, 'days') < 0;
  }

  handleChange = (value) => {
    const startValue = value[0]
    const endValue = value[1]
    const { onFinished } = this.props
    const notToday = startValue > +moment().endOf("day")
                  || startValue < +moment().startOf("day")
    onFinished({
      fromDate: notToday && startValue.startOf("day") || startValue,
      toDate: endValue && endValue.endOf("day")
    })
  }

  render() {
    const state = this.state;
    const { fromDate, toDate, fromDateValue, toDateValue } = this.props

    const fromLabel = this.props.formLabel || "Form"
    const toLabel = this.props.toLabel || "To";

    return (
      <div>
        <Picker
          onOpenChange={this.onStartOpenChange}
          open={this.state.startOpen}
          type="start"
          showValue={fromDateValue}
          value={[fromDate, toDate]}
          onChange={this.onStartChange}
          dateInputPlaceholder={fromLabel}
        />
        <Picker
          onOpenChange={this.onEndOpenChange}
          open={this.state.endOpen}
          type="end"
          showValue={toDateValue}
          disabledDate={this.disabledStartDate}
          value={[fromDate, toDate]}
          onChange={this.onEndChange}
          dateInputPlaceholder={toLabel}
        />
      </div>
    )
  }
}
