var Host = require('../lib/host');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('Tote Betting Host', function () {
    beforeEach(function () {
        host = new Host('../item-info.json');

        shoppingList = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ]


    });

    it('should parse item info', function () {

        expect(host.ITEM_INFO).to.deep.equal({
            "ITEM000001" : {
                "price" : 3,
                "unit" : "瓶",
                "name" : "可口可乐",
                "discount" : "无"
            },
            "ITEM000003" : {
                "price" : 1,
                "unit" : "个",
                "name" : "羽毛球",
                "discount" : "买二赠一"
            },
            "ITEM000005" : {
                "price" : 3,
                "unit" : "斤",
                "name" : "苹果",
                "discount" : "95折"
            }
        });
    });


    it('should parse input list', function () {

        expect(host.load(shoppingList).goods).to.deep.equal({
            "ITEM000001" : {
                "price" : 3,
                "unit" : "瓶",
                "name" : "可口可乐",
                "discount" : "无",
                "count" :5
            },
            "ITEM000003" : {
                "price" : 1,
                "unit" : "个",
                "name" : "羽毛球",
                "discount" : "买二赠一",
                "count" : 2
            },
            "ITEM000005" : {
                "price" : 3,
                "unit" : "斤",
                "name" : "苹果",
                "discount" : "95折",
                "count" : 3
            }
        });
    });




});
