'use strict';

var _ = require('lodash');
var fs = require('fs');
var Discounter = require('./discounter.js');

function Host(file) {
    this.ITEM_INFO = JSON.parse(fs.readFileSync('./item-info.json', 'utf8'));
}

Host.prototype.load = function (input) {
    var that = this;
    that.goods = {};
    if (Array.isArray(input)) {
        _.map(input,function (item) {
            var defaultNumber = 1, itemSplited = item.split('-');
            if (item.indexOf('-') != -1) defaultNumber = parseInt(itemSplited[1]);

            return {
                'key': itemSplited[0],
                'count': defaultNumber
            };
        }).reduce(function (sum, item) {
                if (item.key in that.goods) {
                    that.goods[item.key].count += item.count;
                } else {
                    that.goods[item.key] = that.ITEM_INFO[item.key];
                    that.goods[item.key].count = item.count;
                }
            }, {});
    }
    return that;
};

Host.prototype.print = function () {
    var discounter = new Discounter();
    _.map(this.goods, function (item) {
        console.log(discounter.calculate(item));
    });
    return this;
}

Host.prototype.printWithStyle = function () {
    var discounter = new Discounter();
    console.log("***<没钱赚商店>购物清单***");
    _.map(this.goods, function (item) {
        console.log("名称："+ item.name + ", 数量： " + item.count + ",  单价： " + item.unit + ", 小计： " + discounter.calculate(item));
    });
    console.log("******************");
    return this;
}



module.exports = Host