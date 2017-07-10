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
var moment = require("moment");
var lodash_1 = require("lodash");
var searchkit_1 = require("searchkit");
var DateRangeQuery_1 = require("./DateRangeQuery");
var DateRangeAccessor = (function (_super) {
    __extends(DateRangeAccessor, _super);
    function DateRangeAccessor(key, options) {
        var _this = _super.call(this, key, options.id) || this;
        _this.state = new searchkit_1.ObjectState({});
        _this.clearState = function () {
            // Need to pass state reset through parent component so view can be updated
            _this.options.onClearState();
        };
        _this.options = options;
        _this.options.fieldOptions = _this.options.fieldOptions || { type: "embedded" };
        _this.fieldContext = searchkit_1.FieldContextFactory(_this.options.fieldOptions);
        _this.rangeFormatter = _this.options.rangeFormatter || lodash_1.identity;
        var fromDate = options.fromDate, toDate = options.toDate;
        if (fromDate || toDate) {
            _this.state = _this.state.setValue({
                fromDate: fromDate,
                toDate: toDate
            });
        }
        return _this;
    }
    DateRangeAccessor.prototype.fromQueryObject = function (ob) {
        var fromValue = ob[this.urlKey + '_from'];
        var toValue = ob[this.urlKey + '_to'];
        if (fromValue || toValue) {
            this.state = this.state.setValue({
                fromDate: fromValue && moment(+fromValue),
                toDate: toValue && moment(+toValue)
            });
        }
    };
    DateRangeAccessor.prototype.getQueryObject = function () {
        var val = this.state.getValue();
        var fromDate = val.fromDate && +val.fromDate;
        var toDate = val.toDate && +val.toDate;
        return (val) ? (_a = {},
            _a[this.urlKey + '_from'] = fromDate,
            _a[this.urlKey + '_to'] = toDate,
            _a) : {};
        var _a;
    };
    DateRangeAccessor.prototype.buildSharedQuery = function (query) {
        if (this.state.hasValue()) {
            var val = this.state.getValue();
            var fromDateRangeFilter = this.fieldContext.wrapFilter(DateRangeQuery_1.DateRangeQuery(this.options.fromDateField, {
                lte: +val.toDate
            }));
            var toDateRangeFilter = this.fieldContext.wrapFilter(DateRangeQuery_1.DateRangeQuery(this.options.toDateField, {
                gte: +val.fromDate
            }));
            var fromVal = this.rangeFormatter(val.fromDate);
            var toVal = this.rangeFormatter(val.toDate);
            var selectedFilterText = (val.toDate)
                ? fromVal + " \u2013 " + toVal
                : fromVal + " \u2013";
            var selectedFilter = {
                name: this.translate(this.options.title),
                value: selectedFilterText,
                id: this.options.id,
                remove: this.clearState
            };
            return query
                .addFilter(this.key + '_to', fromDateRangeFilter)
                .addFilter(this.key + '_from', toDateRangeFilter)
                .addSelectedFilter(selectedFilter);
        }
        return query;
    };
    DateRangeAccessor.prototype.getBuckets = function () {
        return this.getAggregations([
            this.key,
            this.fieldContext.getAggregationPath(),
            this.key, "buckets"
        ], []);
    };
    DateRangeAccessor.prototype.isDisabled = function () {
        // This accessor is never "disabled"; the calendar should always be visible
        return false;
    };
    DateRangeAccessor.prototype.buildOwnQuery = function (query) {
        if (this.state.hasValue()) {
            var val = this.state.getValue();
            var otherFilters = query.getFiltersWithoutKeys(this.key);
            var filters = searchkit_1.BoolMust([
                otherFilters,
                this.fieldContext.wrapFilter(DateRangeQuery_1.DateRangeQuery(this.options.fromDateField, {
                    lte: +val.toDate
                })),
                this.fieldContext.wrapFilter(DateRangeQuery_1.DateRangeQuery(this.options.toDateField, {
                    gte: +val.fromDate
                }))
            ]);
            query = query.setAggs(searchkit_1.FilterBucket(this.key, filters));
        }
        return query;
    };
    return DateRangeAccessor;
}(searchkit_1.FilterBasedAccessor));
exports.DateRangeAccessor = DateRangeAccessor;
//# sourceMappingURL=DateRangeAccessor.js.map