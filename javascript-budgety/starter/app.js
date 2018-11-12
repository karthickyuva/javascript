// Budget Controller
/*var budgetController = (function () {
	var x = 50;
	var add = function (a) {
		return x + a;
	};

	return {
		publicTest: function (b) {
			return add(b);
		}
	}
})();

// UI Controller
var uiController = function () {

	// Some code here
}();

// Global Controller
var controller = function (budgetCtl, uiCtl) {

	var z = budgetCtl.publicTest(20);
	return {
		anotherTest: function () {
			console.log(z);
		}
	}

}(budgetController, uiController);
*/
//...........---------........................................

// Budget Controller
var budgetController = (function () {
	var Expense = function (id, description, value) {
		this.id = id,
		this.description = description,
		this.value = value;
	};

	var Income = function (id, description, value) {
		this.id = id,
		this.description = description,
		this.value = value;
	};

	var calculateTotal = function (type) {
		var sum = 0;
		data.allItems[type].forEach(function (current) {
			// sum = sum + current.value
			sum += current.value;
		});
		data.totals[type] = sum;
	};

	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
	};

	return {
		addItem: function (type, des, val ) {
			var newItem;
			// ID = 0;

			// Create new ID
			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}

			// Create new Item based on 'inc' or 'exp'
			if (type === 'exp') {
				newItem = new Expense(ID, des, val);
			} else if(type === 'inc') {
				newItem = new Income(ID, des, val);
			}

			// Push it into our data structure
			data.allItems[type].push(newItem);

			// Return the new item
			return newItem;
		},
		calculateBudget: function () {
			// Calculate the total income and expenses
			calculateTotal('exp');
			calculateTotal('inc');

			// Calculate the budget: inc - exp
			data.budget = data.totals.inc - data.totals.exp;

			if (data.totals.inc > 0 ) {
				// Calculate the percentage
				data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
			} else {
				data.percentage = -1;
			}
		},
		getBudget: function () {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			}
		},
		testing: function () {
			console.log(data);
		}
	}

})();

// UI Controller
var uiController = function () {
	// Some code here

	var DOMStrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		addButton: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expensesLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage'
	};

	return {
		getInput: function () {
			return {
				type: document.querySelector(DOMStrings.inputType).value,
				description: document.querySelector(DOMStrings.inputDescription).value,
				value: parseInt(document.querySelector(DOMStrings.inputValue).value)
			}
		},
		addListItem: function (obj, type) {
			var html, newHtml, element;

			// Create HTML with placeholder text
			if (type === 'inc') {
				element = DOMStrings.incomeContainer;
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
			} else if(type === 'exp') {
				element = DOMStrings.expensesContainer;
				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
			}

			// Replace the placeholder with actual data
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);

			// Insert the HTML to DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		},
		clearFields: function () {
			var inputFields, fieldsArray;
			inputFields = document.querySelectorAll(DOMStrings.inputValue + ',' + DOMStrings.inputDescription);
			fieldsArray = Array.prototype.slice.call(inputFields);
			fieldsArray.forEach(function (currentValue, index, array) {
				currentValue.value = '';
			});
			fieldsArray[0].focus();
		},
		displayBudget: function (obj) {
			document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
			document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
			document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExp;

			if (obj.percentage > 0) {
				document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
			} else {
				document.querySelector(DOMStrings.percentageLabel).textContent = '---';
			}
		},
		getDOMStrings: function () {
			return DOMStrings
		}
	};

}();

// Global Controller
var controller = (function (budgetCtl, UICtl) {

	var setUpEventListener = function () {
		var DOM = UICtl.getDOMStrings();
		document.querySelector(DOM.addButton).addEventListener('click', ctrlAddItem);
		document.addEventListener('keypress', function (event) {
			if (event.keyCode === 13 || event.which === 13) {
				ctrlAddItem();
			}
		})
	};

	var updateBudget = function () {

		// 1. budgetCtl the budget
		budgetCtl.calculateBudget();

		// 2. Return the budget
		var budget = budgetCtl.getBudget();

		// 3. Display the budget on the UI
		UICtl.displayBudget(budget);

	};

	var ctrlAddItem = function () {
		var input, newItem;

		// 1. Get the field input data
		input = UICtl.getInput();

		if (input.description !== "" && input.value > 0 && !isNaN(input.value)) {
			// 2. Add the item to the budget controller
			newItem = budgetCtl.addItem(input.type, input.description, input.value);

			// 3. Add the item to the UI
			UICtl.addListItem(newItem, input.type);

			// 4. Clear Fields
			UICtl.clearFields();

			// 5. Update Budget
			updateBudget();
		}
	};

	return {
		init: function () {
			console.log("Application gets started");
			UICtl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			});
			setUpEventListener();
		}
	}

})(budgetController, uiController);

controller.init();