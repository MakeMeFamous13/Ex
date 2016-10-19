//'use strict';
var numbers = [1,1,2,2,3,4,3,7,10,7];

var products = [
    {name: "Banana", price: 25},
    {name: "Kiwi", price: 30},
    {name: "Cocos", price: 42.5}
];

//call usage
var Product = {
    init: function (name, price) {
        this.name = name;
        this.price = price;

        if (price < 0) {
            throw RangeError('Cannot create product: ' + this.name + ', price is negative.');
        }
    },

    calculate: function (amount) {
        console.log(this.name + " [price:" + this.price + ", amount: " + amount + "] summary:", this.price * amount);
    }
};

function Food(name, price) {
    Product.init.call(this, name, price);
}

function Toy(name, price) {
    Product.init.call(this, name, price);
}

var cheese = new Food("Cheese", 113);
Product.calculate.call(cheese, 0.3);

var pinokio = new Toy("Pinokio", 400);
Product.calculate.call(pinokio, 2);

for (var i = 0; i < products.length; i++) {
    (
        function (i) {
            console.log("Init: product[" + this.name + "], price: $" + this.price);
        }
    ).call(products[i], i);
}

for (var i = 0; i < products.length; i++) {
    var thisArg = new Food(products[i].name, products[i].price);
    Product.calculate.call(thisArg, 5);
}

function list(arguments){
    return Array.prototype.slice(arguments);
}

var list1 = list(1,2,3);
console.log(list1);


//apply usage
var Products = [new Food("Cheese", 113), new Toy("Pinokio", 400)];

console.log("Max from: " + numbers + " is ", Math.max.apply(null, numbers));
console.log("Min from: " + numbers + " is ", Math.min.apply(null, numbers));

//function MyConstructor() {
//    for (var nProp = 0; nProp < arguments.length; nProp++) {
//        this['property' + nProp] = arguments[nProp];
//    }
//}
//
//var myArray = [4, 'Hello world!', false];
//var myInstance = MyConstructor.construct(myArray);
//
//console.log(myInstance.property1);                // logs 'Hello world!'
//console.log(myInstance instanceof MyConstructor); // logs 'true'
//console.log(myInstance.constructor);              // logs 'MyConstructor'


//bind usage
this.x = -1;
var module = {
    x: 90,
    getX: function(){
        return this.x;
    }
};

module.getX();
var retrieveX = module.getX;

var boundGetX = retrieveX.bind(module);
console.log(boundGetX());

