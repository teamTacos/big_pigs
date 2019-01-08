// class Die {
//   constructor(target) {
//     this.target = $(target)
//   }
//   roll() {
//     this.value = rollDie();
//     this.target.removeClass();
//     this.target.addClass('die die-' + this.value)
//   }
//   value() {
//   	return this.value
//   }
// }

function Die(target, value) {
	this.target = $(target);
	this.value = value;
	this.roll = function() {
		this.value = rollDie();
		this.target.removeClass();
		this.target.addClass('die die-' + this.value)
	}
}
