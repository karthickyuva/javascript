// Function Constructor

var john = {
	name: 'Karthick',
	yearOfBirth: 1990,
	job: 'Web Developer'
};

// Step one without using prototype
/*  var Person = function (name, yearOfBirth, job) {
	this.name = name;
	this.yearOfBirth = yearOfBirth;
	this.job = job;
	this.calcAge = function () {
		this.age = 2018 - this.yearOfBirth;
	}
};
*/

// Step two with using prototype
/* var Person = function (name, yearOfBirth, job) {
	this.name = name;
	this.yearOfBirth = yearOfBirth;
	this.job = job;
};

Person.prototype.calcAge = function () {
	this.age = 2018 - this.yearOfBirth;
	// this.gender = 'Male';
};

Person.prototype.gender = 'Male';

var person1 = new Person('Saravana', 1991, 'Senior developer');
var person2 = new Person('Mike', 1990, 'Developer');
var person3 = new Person('Karthick', 1989, 'FrontEnd Decveloper');

person1.calcAge();
person2.calcAge();
person3.calcAge();
console.log(person1.gender);
console.log(person2.gender);
console.log(person3.gender);
console.log([person1, person2, person3]);
*/

// Object.create

/*  var personProto = {
	calcAge: function () {
		this.age = 2018 - this.yearOfBirth;
	}
};

var karthick = Object.create(personProto);
karthick.name = 'Karthick';
karthick.yoerOfBirth = 1989;
karthick.job = 'Developer';

var jane = Object.create(personProto, {
	name: { value: 'Jane' },
	yearOfBirth: { value: 1969 },
	job: { value: 'Designer' }
});

*/

// Primitives vs Objects
/*
// Primitives
var a = 34;
var b = a;
a = 55;
console.log(a, b);

// Objects
var obj1 = {
	name: 'Karthick',
	age: 29
};
var obj2 = obj1;
obj1.age = 28;
console.log(obj1.age);
console.log(obj2.age);

// Functions
var age = 30;
var obj = {
	name: 'Karthick',
	city: 'Chennai'
};

function changeDetails(a, b) {
	a = 29;
	b.city = 'Bangalore'
}

changeDetails(age, obj);
console.log(age);
console.log(obj.city);

*/

// Lecture: passing functions as arguments

//
// var years = [1991, 1993, 2009, 1990, 1989, 2007];
//
// function arrayCalc(arr, callback) {
// 	var arrayResult = [];
//
// 	// Using for loop
// 	/* for (var i = 0; i < arr.length; i++) {
// 		arrayResult.push(callback(arr[i]));
// 	} */
//
// 	// Using forEach
// 	arr.forEach(function (item) {
// 		arrayResult.push(callback(item));
// 	});
//
// 	return arrayResult;
// }

//.......................................
// callback functions
/*
function calcAge(el) {
	return 2018 - el;
}

function isFullAge(el) {
	return el >= 18;
}

function maxHeartRate(el) {
	if (el >= 18 && el <= 81 ) {
		return Math.round(206.9 - (0.67 * el));
	} else {
		return -1;
	}
}

var ages = arrayCalc(years, calcAge);
console.log(ages);

var fullAges = arrayCalc(ages, isFullAge);
console.log(fullAges);

var heartRates = arrayCalc(ages, maxHeartRate);
console.log(heartRates);
*/

// Lecture: Functions returning functions

/*
function interViewQuestions(job) {
	if (job === 'designer') {
		return function (name) {
			console.log(name + ' can you please explain what UX design is?');
		}
	} else if (job === 'frontEndDeveloper') {
		return function (name) {
			console.log(name + ' can you please explain what FrontEnd Development is?');
		}
	} else if (job === 'teacher') {
		return function (name) {
			console.log('What subject do you teach, ' + name + '?');
		}
	} else {
		return function (name) {
			console.log('What do you do?')
		}
	}
}

var designerQuestion = interViewQuestions('designer');
var developerQuestion = interViewQuestions('frontEndDeveloper');
var teacherQuestion = interViewQuestions('teacher');

designerQuestion('Christoper');
developerQuestion('Karthick');
teacherQuestion('John');
developerQuestion('Saravana');
developerQuestion('Radha Krishnan');

// valuated from left to right
teacherQuestion('teacher', 'Mark');
developerQuestion('frontEndDeveloper', 'Mike');
*/

// Lecture: Closure
/*
function retirement(retirementAge) {
	var a = ' years left until retirement';
	return function (yearOfBirth) {
		var age = 2018 - yearOfBirth;
		console.log((retirementAge - age) + a);
	}
}

var retirementUs = retirement(61);
retirementUs(1990);
var retirementIceland = retirement(60);
retirementIceland(1990);

// Closure Practice
function interViewQuestions(job) {
	var designerQuestion = ' can you please explain what UX design is?';
	var teacherQuestion = 'What subject do you teach, ';
	var noQuestion = 'What do you do?';
	return function (name) {
		if (job === 'designer') {
			console.log(name + designerQuestion);
		} else if (job === 'teacher') {
			console.log(teacherQuestion + name + '?');
		} else {
			console.log(noQuestion)
		}
	};
}

var showDesignerQuestion = interViewQues
tions('designer');
var showTeacherQuestion = interViewQuestions('teacher');

showDesignerQuestion('Christoper');
showTeacherQuestion('John');
*/

// Lecture: bind, call and apply
/*
var jhon = {
	name: 'Jhon',
	age: 26,
	job: 'teacher',
	presentation: function (style, timeOfDay) {
		if (style === 'formal') {
			console.log('Good' + timeOfDay + ', Ladies and gentleman! I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + 'years old.');
		} else if (style === 'friendly') {
			console.log('Hey! what\'s up? I\'m ' + this.name + ', I\'m a' + this.job + ' and I\'m ' + this.age + 'years old. Have a nice ' + timeOfDay + '.');
		}
	}
};

var emily = {
	name: 'Emily',
	age: 35,
	job: 'designer'
};

jhon.presentation('formal', 'morning');
jhon.presentation.call(emily, 'friendly', 'afternoon');
// jhon.presentation.apply(emily, 'friendly', 'evening');

var johnFriendly = jhon.presentation.bind(jhon, 'friendly');
johnFriendly('evening');

var emilyFormal = jhon.presentation.bind(emily, 'formal');
emilyFormal('evening');

//...............................................

var years = [1991, 1999, 2004, 1990, 1989, 2007];

function arrayCalc(arr, callback) {
	var arrayResult = [];

	// Using forEach
	arr.forEach(function (item) {
		arrayResult.push(callback(item));
	});

	return arrayResult;
}

// callback functions

 function calcAge(el) {
 return 2018 - el;
 }

 function isFullAge(limit, el) {
 return el >= limit;
 }

 var ages = arrayCalc(years, calcAge);
var japanFullAge = arrayCalc(ages, isFullAge.bind(this, 20));
console.log(ages);
console.log(japanFullAge);
*/

/////////////////////////////
// CODING CHALLENGE


/*
 --- Let's build a fun quiz game in the console! ---

 1. Build a function constructor called Question to describe a question. A question should include:
 a) question itself
 b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
 c) correct answer (I would use a number for this)

 2. Create a couple of questions using the constructor

 3. Store them all inside an array

 4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

 5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

 6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

 7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
 */
//
// function quizQuestions(questionType) {
// 	var programmingQuestion = 'Is javascript is an cool?';
// 	var jobQuestion = 'Is jhon is a teacher?';
// 	var courseTeacher = 'Who is the teach of this javascript course?';
// 	var developerQuestion = 'What is the role of Mark';
// 	var question;
//
// 	return function () {
// 		if (questionType === 'programming') {
// 			question = programmingQuestion;
// 		} else if (questionType === 'job') {
// 			question = jobQuestion;
// 		} else if (questionType === 'course') {
// 			question = courseTeacher;
// 		} else if (questionType === 'developer') {
// 			question = developerQuestion;
// 		} else {
// 			question = 'Do you like this Quiz?'
// 		}
//
// 		return question;
// 	}
// }

/*
// practice
var programmingQuestion = 'Is javascript is an cool?';
var jobQuestion = 'Are? Jhon is a teacher?';
var developerQuestion = 'What is the role of Mark';
var question5 = 'What is you favorite color Jhon?';
var courseTeacher = 'Who is the teacher of this javascript course?';
var question6 = 'Jhon\'s like to playing cricket?';
var quizQuestion = [
	programmingQuestion, question5, jobQuestion, developerQuestion, courseTeacher, question6
];

function arrayQuestions(arr, callback) {
	var questions = [];

	// Using forEach
	arr.forEach(function (item) {
		questions.push(callback(item));
	});

	return questions;
}

function questions(item) {
	return item;
}

function arrayAnswers(arr, callback) {
	var questions = [];

	// Using forEach
	arr.forEach(function (item) {
		questions.push(callback(item));
	});

	return questions;
}

 var Answers = function (answerType2) {
 this.answerType2 = ['Teacher', 'Designer', 'Developer', 'Driver'];
 this.yearOfBirth = yearOfBirth;
 this.job = job;
 };

var showQuestions = arrayQuestions(quizQuestion, questions);
var showAnswers = arrayAnswers(quizQuestion, questions);
var questionsOrder = Math.floor(Math.random() * showQuestions.length + 1);
var answerType1 = {
	yes: true,
	no: false
};
var answerType2 = ['Teacher', 'Designer', 'Developer', 'Driver'];
var answerType3 = ['Jhon', 'Jones', 'Mike', 'Mark'];

function showQuizQuestions() {
	var question;
	if (questionsOrder === 1) {
		question = questionsOrder + ') ' + showQuestions[0]
	} else if (questionsOrder === 2) {
		question = questionsOrder + ') ' + showQuestions[1]
	} else if (questionsOrder === 3) {
		question = questionsOrder + ') ' + showQuestions[2]
	} else if (questionsOrder === 4) {
		question = questionsOrder + ') ' + showQuestions[3]
	} else if (questionsOrder === 5) {
		question = questionsOrder + ') ' + showQuestions[4]
	} else if (questionsOrder === 6) {
		question = questionsOrder + ') ' + showQuestions[5]
	} else {
		question = "Do you like this Quiz?"
	}

	return question;
}

var executeQuestion = showQuizQuestions();

console.log(executeQuestion);
prompt('Please Select the correct answer(just type the number or type exit to quit)');
*/

(function () {
	const Yes = 1;
	const No = 0;
	var programmingQuestion = 'Is javascript is an cool programming language?';
	var jobQuestion = 'Are? Jhon is a teacher?';
	var developerQuestion = 'What is the role of Mark';
	var courseTeacher = 'Who is the teacher of this javascript course?';
	var question6 = 'Jhon\'s like to playing cricket?';

	var answerType1 = ['Yes', 'No'];
	var answerType2 = ['Teacher', 'Designer', 'Developer', 'Driver'];
	var answerType3 = ['Jhon', 'Jones', 'Mike', 'Mark'];

// Constructor
	function QuestionAnswers(questions, answer, correctAnswer) {
		this.questions = questions;
		this.answer = answer;
		this.correctAnswer = correctAnswer;
	}

	QuestionAnswers.prototype.showQuestion = function () {
		console.log(this.questions);
		for (var i = 0; i < this.answer.length; i++) {
			console.log(i + ': ' + this.answer[i]);
		}
	};

	QuestionAnswers.prototype.showAnswer = function (answer, callback) {
		var updateScore;
		if (answer === this.correctAnswer) {
			console.log('Correct Answer!');
			updateScore = callback(true);
		} else {
			console.log('Wrong answer, please try again.')
			updateScore = callback(false);
		}

		this.displayScore(updateScore);
	};

	QuestionAnswers.prototype.displayScore = function (score) {
		console.log('Your current score is ' + score);
		console.log('-----------------------------------');
	};

	var q1 = new QuestionAnswers(programmingQuestion, answerType1, 0);
	var q2 = new QuestionAnswers(jobQuestion, answerType1, 1);
	var q3 = new QuestionAnswers(courseTeacher, answerType3, 1);
	var q4 = new QuestionAnswers(question6, answerType1, 0);
	var q5 = new QuestionAnswers(developerQuestion, answerType2, 1);

	var questions = [q1, q2, q3, q4, q5];

	// Closure
	function score() {
		var updateScore = 0;
			return function (correct) {
			if (correct) {
				updateScore++;
			}
			return updateScore;
		}
	}

	var keepScore = score();

	function nextQuestion() {
		var n = Math.floor(Math.random() * questions.length);
		questions[n].showQuestion();
		var answer = prompt('Please select the correct answer.');

		if (answer !== 'exit') {
			questions[n].showAnswer(parseInt(answer), keepScore);
			nextQuestion();
		}
	}
	nextQuestion();
})();










