var Host = require('./lib/host');

var shoppingList = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-3',
    'ITEM000005',
    'ITEM000005',
    'ITEM000005'
]

var host = new Host('./item-info.json');

host.load(shoppingList).printWithStyle();

