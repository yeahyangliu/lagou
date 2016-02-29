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

Host.prototype.printWithStyle = function () {
    var calculatedResults = new Discounter().calculateAll(this.goods);

    console.log("***<没钱赚商店>购物清单***");
    _.map(calculatedResults, function (result) {
        var discountInfo = '';
        if (isPercentageDiscount(result)) {
            discountInfo = ", 节省 " + result.discountValue.toFixed(2) + " (元)";
        }
        console.log("名称：" + result.name + ", 数量： " + result.count + ",  单价： " + result.price.toFixed(2) +
            " (元), 小计： " + result.value.toFixed(2) + " (元)" + discountInfo);
    });


    if (_.some(calculatedResults, isBuyTwoFreeOne)) {
        console.log("------------------")
        console.log('买二赠一商品');
        _.map(_.filter(calculatedResults, isBuyTwoFreeOne), function (item) {
            console.log("名称：" + item.name + " , 数量： " + item.discountValue / item.price + " " + item.unit)
        });
    }

    console.log("------------------")
    console.log("总计" + _.sum(calculatedResults,function (result) {
        return result.value
    }).toFixed(2) + " （元）");
    console.log("节省" + _.sum(calculatedResults,function (result) {
        return result.discountValue
    }).toFixed(2) + " （元）");
    console.log("******************");
    return this;
}


function isPercentageDiscount(item) {
    return item.discountWay === '95折' && item.discountValue > 0;
}

function isBuyTwoFreeOne(item) {
    return item.discountWay === '买二赠一' && item.discountValue > 0;
}

module.exports = Host