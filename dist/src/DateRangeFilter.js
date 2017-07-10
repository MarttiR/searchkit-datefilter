"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var moment = require("moment");
var searchkit_1 = require("searchkit");
var DateRangeAccessor_1 = require("./DateRangeAccessor");
var lodash_1 = require("lodash");
// For testing without a calendar component. Accepts date math.
var DateRangeFilterInput = (function (_super) {
    __extends(DateRangeFilterInput, _super);
    function DateRangeFilterInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleDateFinished = function (event) {
            var onFinished = _this.props.onFinished;
            var newState = {
                fromDate: _this.refs.dateFromInput.value,
                toDate: _this.refs.dateToInput.value
            };
            onFinished(newState);
        };
        return _this;
    }
    DateRangeFilterInput.prototype.render = function () {
        var _a = this.props, fromDate = _a.fromDate, toDate = _a.toDate;
        return (React.createElement("div", null,
            React.createElement("input", { id: "date-from", ref: "dateFromInput", defaultValue: fromDate }),
            React.createElement("input", { id: "date-to", ref: "dateToInput", defaultValue: toDate }),
            React.createElement("button", { id: "date-submit", onClick: this.handleDateFinished }, "OK")));
    };
    return DateRangeFilterInput;
}(searchkit_1.SearchkitComponent));
exports.DateRangeFilterInput = DateRangeFilterInput;
var DateRangeFilter = (function (_super) {
    __extends(DateRangeFilter, _super);
    function DateRangeFilter(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClearState = function () {
            _this.accessor.resetState();
        };
        _this.setCalendarState = function (newValues) {
            if (!newValues.fromDate) {
                _this.accessor.resetState();
            }
            else {
                _this.accessor.state = _this.accessor.state.setValue(newValues);
            }
        };
        _this.calendarUpdate = function (newValues) {
            _this.setCalendarState(newValues);
        };
        _this.calendarUpdateAndSearch = function (newValues) {
            _this.calendarUpdate(newValues);
            _this.searchkit.performSearch();
        };
        return _this;
    }
    DateRangeFilter.prototype.defineAccessor = function () {
        var _a = this.props, id = _a.id, title = _a.title, fromDate = _a.fromDate, toDate = _a.toDate, fromDateField = _a.fromDateField, toDateField = _a.toDateField, fieldOptions = _a.fieldOptions, rangeFormatter = _a.rangeFormatter;
        return new DateRangeAccessor_1.DateRangeAccessor(id, {
            id: id,
            fromDate: fromDate,
            toDate: toDate,
            fromDateField: fromDateField,
            toDateField: toDateField,
            title: title,
            fieldOptions: fieldOptions,
            rangeFormatter: rangeFormatter,
            onClearState: this.handleClearState
        });
    };
    DateRangeFilter.prototype.defineBEMBlocks = function () {
        var block = this.props.mod || "sk-date-range-filter";
        return {
            container: block,
            labels: block + "-value-labels"
        };
    };
    DateRangeFilter.prototype.getCalendarComponent = function () {
        var calendarComponent = this.props.calendarComponent;
        return (calendarComponent || DateRangeFilterInput);
    };
    DateRangeFilter.prototype.render = function () {
        var _a = this.props, id = _a.id, title = _a.title, containerComponent = _a.containerComponent;
        return searchkit_1.renderComponent(containerComponent, {
            title: title,
            className: id ? "filter--" + id : undefined,
            disabled: this.accessor.isDisabled()
        }, this.renderCalendarComponent(this.getCalendarComponent()));
    };
    DateRangeFilter.prototype.renderCalendarComponent = function (component) {
        var _a = this.props, fromDate = _a.fromDate, toDate = _a.toDate, rangeFormatter = _a.rangeFormatter;
        var state = this.accessor.state.getValue();
        return searchkit_1.renderComponent(component, {
            fromDate: state.fromDate || fromDate,
            toDate: state.toDate || toDate,
            fromDateValue: lodash_1.get(state, "fromDate", fromDate),
            toDateValue: lodash_1.get(state, "toDate", toDate),
            items: this.accessor.getBuckets(),
            onChange: this.calendarUpdate,
            onFinished: this.calendarUpdateAndSearch,
            rangeFormatter: rangeFormatter
        });
    };
    return DateRangeFilter;
}(searchkit_1.SearchkitComponent));
DateRangeFilter.propTypes = lodash_1.defaults({
    fromDate: React.PropTypes.object,
    toDate: React.PropTypes.object,
    fromDateField: React.PropTypes.string.isRequired,
    toDateField: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    containerComponent: searchkit_1.RenderComponentPropType,
    calendarComponent: searchkit_1.RenderComponentPropType,
    rangeFormatter: React.PropTypes.func,
    fieldOptions: React.PropTypes.shape({
        type: React.PropTypes.oneOf(["embedded", "nested", "children"]).isRequired,
        options: React.PropTypes.object
    }),
}, searchkit_1.SearchkitComponent.propTypes);
DateRangeFilter.defaultProps = {
    containerComponent: searchkit_1.Panel,
    rangeFormatter: function (v) { return moment(parseInt("" + v)).format('D.M.YYYY'); }
};
exports.DateRangeFilter = DateRangeFilter;
//# sourceMappingURL=DateRangeFilter.js.map