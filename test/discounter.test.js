var Discounter = require('../lib/discounter');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('Tote Betting Host', function () {
    beforeEach(function () {
        discounter = new Discounter();

        goods = {
            "ITEM000001": {
                "price": 3,
                "unit": "瓶",
                "name": "可口可乐",
                "discount": "无",
                "count": 5
            },
            "ITEM000003": {
                "price": 1,
                "unit": "个",
                "name": "羽毛球",
                "discount": "买二赠一",
                "count": 2
            },
            "ITEM000005": {
                "price": 3,
                "unit": "斤",
                "name": "苹果",
                "discount": "95折",
                "count": 3
            },
            "ITEM000007": {
                "price": 3,
                "unit": "斤",
                "name": "苹果",
                "discount": "95折,买二赠一",
                "count": 3
            }
        }

    });

    it('should get the correct price', function () {
        expect(discounter.calculate(goods['ITEM000001'])).to.deep.equal(15);
        expect(discounter.calculate(goods['ITEM000003'])).to.deep.equal(2);
        expect(discounter.calculate(goods['ITEM000005'])).to.deep.equal(8.55);
        expect(discounter.calculate(goods['ITEM000007'])).to.deep.equal(6);
    })
});


