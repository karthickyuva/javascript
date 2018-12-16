/////////////////////////////////
// CODING CHALLENGE

/*

 Suppose that you're working in a small town administration, and you're in charge of two town elements:
 1. Parks
 2. Streets

 It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

 At an end-of-year meeting, your boss wants a final report with the following:
 1. Tree density of each park in the town (forumla: number of trees/park area)
 2. Average age of each town's park (forumla: sum of all ages/number of parks)
 3. The name of the park that has more than 1000 trees
 4. Total and average length of the town's streets
 5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

 All the report data should be printed to the console.

 HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

 */

class Element {
	constructor(name, buildYear) {
		this.name = name;
		this.buildYear = buildYear;
	}
}

class Park extends Element {
	constructor(name, buildYear, area, trees) {
		super(name, buildYear);
		this.area = area; //km2
		this.trees = trees;
	}

	treeDensity() {
		const treeDen = this.trees / this.area;
		console.log(`${this.name} park has a ${treeDen} number of trees per KM2`);
	}
}

class Street extends Element {
	constructor(name, buildYear, length, size = 3) {
		super(name, buildYear);
		this.length = length;
		this.size = size;
	}

	classifyStreet() {
		const classification = new Map();
		classification.set(1, 'tiny');
		classification.set(2, 'small');
		classification.set(3, 'normal');
		classification.set(4, 'big');
		classification.set(5, 'huge');
		console.log(`${this.name}, build in ${this.buildYear}, is a ${classification.get(this.size)} street`);
	}
}

const allParks = [new Park("Goldan Park", 1901, 1.2, 910),
new Park("Banarkata Park", 1890, 2.3, 988),
new Park("National Park", 1881, 5.8, 3590)];

const allStreets = [new Street("Gandhi Nagar", 1951, 0.9, 2),
new Street("Rich street", 1991, 1.3, 4),
new Street("4th Goldan street", 1983, 3.2, 3)];

function calc(arr) {
	const sum = arr.reduce((prev, cur, index) => prev + cur, 0);

	return [sum, sum / arr.length];
}

function reportParks(p) {
	console.log("----Parks Report----");

	// Density
	p.forEach(el => el.treeDensity());

	// Average age
	const ages = p.map(el => new Date().getFullYear() - el.buildYear);
	const [totalAge, avgAge] = calc(ages);
	console.log(`Our ${p.length} parks an average od ${avgAge} years.`);

	// Which park has more than 1000 trees
	const i = p.map(el => el.trees).findIndex(el => el >= 1000);
	console.log(`${p[i].name} has more than 1000 trees.`)

}

function reportStreets(s) {
	console.log("----Streets Report----");
	// Total and average length of the town's streets
	const [totalLength, avgLength] = calc(s.map(el => el.length));
	console.log(`Our ${s.length} street have a total length of ${totalLength} km with an avarage of ${avgLength}`);

	// Classify sizes
	s.forEach(el => el.classifyStreet());
}

reportParks(allParks);
reportStreets(allStreets);

var GoldenPark = new Element("Golden Park", 1901, 2000, 745);
