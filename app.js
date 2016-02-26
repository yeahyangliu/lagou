var Host = require('./lib/host');

var shoppingList = [
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

var host = new Host('./item-info.json');

host.load(shoppingList).print().printWithStyle();

