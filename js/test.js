var Car = function(loc){
	var obj = Object.create(Car.prototype);
    obj.loc = loc;
    return obj;
};
Car.prototype.move = function(){
    this.loc++;
};
console.log(Car.prototype.constructor);
