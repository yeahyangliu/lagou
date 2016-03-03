'use strict';
var _ = require('lodash');


function Discounter() {
    this.ORDER = {
        "买二赠一": {ORDER: 1, discountWay: "买二赠一", func: function (price, count) {
            return price * (count - parseInt(count / 3));
        }},
        "95折": {ORDER: 2, discountWay: "95折", func: function (price, count) {
            return price * count * 0.95;
        }},
        "无": {ORDER: 3, discountWay: "无", func: function (price, count) {
            return price * count;
        }}}
}

Discounter.prototype.calculate = function (item) {
    var that = this;
    var discounter = _.chain(item.discount.split(',')).map(function (dis) {
        return that.ORDER[dis];
    }).sortBy(function (discount) {
        return discount.ORDER;
    }).value()[0];


    item.value = Math.round(discounter.func(item.price, item.count) * 100) / 100;
    item.discountWay = discounter.discountWay;
    if (item.discount.indexOf('无') == -1) {
        item.discountValue = item.price * item.count - item.value;
    }

    return item;
};

Discounter.prototype.calculateAll = function (items) {
    var that = this;
    return _.map(items, function (item) {
        return that.calculate(item);
    });

}

module.exports = Discounter
