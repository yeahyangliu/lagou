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
        _.map(input, function (item) {
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


module.exports = Host