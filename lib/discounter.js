'use strict';
var _ = require('lodash');


function Discounter() {
    this.order = {
        "买二赠一": {order: 1, func: function (price, count) {
            return price * (count - parseInt(count / 3))
        }},
        "95折": {order: 2, func: function (price, count) {
            return price * count * 0.95
        }},
        "无": {order: 3, func: function (price, count) {
            return price * count
        }}}
}

Discounter.prototype.calculate = function (item) {
    var that = this;
    var discounter = _.sortBy(_.map(item.discount.split(','), function (dis) {
        return that.order[dis];
    }), function (discount) {
        return discount.order;
    })[0];

    return  Math.round(discounter.func(item.price, item.count) * 100) / 100;
};

module.exports = Discounter
