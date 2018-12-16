// Classes

// ES5
/*
var Person5 = function (name, yearOfBirth, job) {
	this.name = name,
	this.yearOfBirth = yearOfBirth,
	this.job = job
};

Person5.prototype.calculateAge = 
	function () {
		var age = new Date().getFullYear() - this.yearOfBirth;
		console.log(age);
	};
var karthick = new Person5("Karthick", 1990, "Developer");

//ES6

class Person6 {
    constructor(name, yearOfBirth, job) {
		this.name = name,
		this.yearOfBirth = yearOfBirth,
		this.job = job
	}

	calculateAge() {
    	var age = new Date().getFullYear() -this.yearOfBirth;
    	console.log(age);
	}
}

const John = new Person6("John", 1990, "Developer");

*/

// Classes Subclasses

//ES5

var Person5 = function (name, yearOfBirth, job) {
	this.name = name;
	this.yearOfBirth = yearOfBirth;
	this.job = job;
};

Person5.prototype.calculateAge =
	function () {
		var age = new Date().getFullYear() - this.yearOfBirth;
		console.log(age);
	};

var Athlete5 = function (name, yearOfBirth, job, olympicGames, medals) {
	Person5.call(this, name, yearOfBirth, job);
	this.olympicGames = olympicGames;
	this.medals = medals;
	this.age = function () {
			return age = new Date().getFullYear() - yearOfBirth;
		}();
};

Athlete5.prototype = Object.create(Person5.prototype);

Athlete5.prototype.wonMedal = function () {
	this.medals ++;
	console.log(this.medals);
};

var johnAthlete = new Athlete5("John", 1989, "Developer", "Running", 12);

johnAthlete.calculateAge();
johnAthlete.wonMedal();

// ES6

class Person6 {
	constructor(name, yearOfBirth, job) {
		this.name = name;
		this.yearOfBirth = yearOfBirth;
		this.job = job;
	}

	calculateAge() {
		var age = new Date().getFullYear() -this.yearOfBirth;
		console.log(age);
	}
}

class Athlete6 extends Person6 {
	constructor(name, yearOfBirth, job, olympicGames, medals) {

		super(name, yearOfBirth, job);
		this.olympicGames = olympicGames;
		this.medals = medals;
		this.age = function() {
			return new Date().getFullYear() - yearOfBirth;
		}();
	}

	wonMedal() {
		this.medals++;
		console.log(this.medals);
	}
}

var johnAthlete6 = new Athlete6("Karthick", 1989, "Developer", "Running", 10);

johnAthlete6.calculateAge();
johnAthlete6.wonMedal();
