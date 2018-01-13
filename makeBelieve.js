/*
	Skeleton from teacher Arnar Leifsson.
*/
(function () {
	function makeBelieveElement(element, length) {
		var i = 0;
		element.forEach(element => {
			this[i] = element;
			i += 1;
		});
		this.length = length;
	}

	/* begin methods */

	makeBelieveElement.prototype.nextSibling = function () {
		/*
			This function takes a makeBelieveElement and goes
			through every element it represents and gets the 
			next sibling to those elements, and returns them 
			in a new makeBelieveElement
		*/
		var allNextSiblings = [];
		for (let index = 0; index < this.length; index++) {
			const nextSibling = this[index].nextElementSibling;
			if (nextSibling) {
				allNextSiblings.push(nextSibling);
			}
		}
		return new makeBelieveElement(allNextSiblings, allNextSiblings.length);
	};

	makeBelieveElement.prototype.previousSibling = function () {
		/*
			This function takes a makeBelieveElement and goes
			through every element it represents and gets the 
			previous sibling to those elements and returns 
			a new makeBelieveElement
		*/
		var allPreviousSiblings = [];
		for (let index = 0; index < this.length; index++) {
			const previousSibling = this[index].previousElementSibling;
			if (previousSibling) {
				allPreviousSiblings.push(previousSibling);
			}
		}
		return new makeBelieveElement(allPreviousSiblings, allPreviousSiblings.length);
	}

	function nodelistContains(nodelist, element) {
		nodelist.forEach(el => {
			if (el == element) {
				return true;
			}
		});
		return false;
	}

	makeBelieveElement.prototype.parent = function (selector = "") {
		/* 
			returns every parent of every item in the makebelieve element.
			Can be filtered by a optional css selector
		*/

		// make a nodelist of parents that I allow if the user asks for a filtered version
		var possibleParents = ""
		if (selector != "") {
			possibleParents = document.querySelectorAll(selector);
		}
		var allParents = [];
		for (let index = 0; index < this.length; index++) {
			const parent = this[index].parentNode;
			if (parent && !allParents.includes(parent)) {
				if (selector != "") {
					if (nodelistContains(possibleParents, parent)) {
						allParents.push(parent);
					}
				} else {
					allParents.push(parent);
				}
			}
		}
		return new makeBelieveElement(allParents, allParents.length);
	}

	makeBelieveElement.prototype.grandParent = function (selector = "") {
		/* returns a parents parent */
		return this.parent().parent(selector);
	}

	function ancestorHelper(element, parentSelector) {
		// get all items which match the parent selector
		var parents = document.querySelectorAll(parentSelector);
		// read up until a parent with the correct selector is found, null is returned if none are found.
		var currentParent = element.parentNode;
		while (currentParent && !nodelistContains(parents, currentParent)) {
			console.log(nodelistContains(parents, currentParent));
			currentParent = currentParent.parentNode;
		}
		console.log("ended at");
		console.log(currentParent);
		return currentParent;

	}

	function ancestorHandler(makebelieve,selector) {
		/* 
			returns any ancestor of an item which is greater than a grandparent to it
			can be filtered by an optional css selector 
		*/
		console.log("in handler with ");
		console.log(makebelieve);
		var allAncestors = [];
		for (let index = 0; index < makebelieve.length; index++) {
			if (selector != "") {
				// helper to get parents with a given selector
				const ancestor = ancestorHelper(makebelieve[index], selector);
				if (ancestor && !allAncestors.includes(ancestor)) {
					allAncestors.push(ancestor);
				}
			} else {
				const ancestor = makebelieve[index].parentNode;
				if (ancestor && !allAncestors.includes(ancestor)) {
					allAncestors.push(ancestor)
				}
			}
		}
		console.log("found these");
		console.log(allAncestors);
		return new makeBelieveElement(allAncestors, allAncestors.length);
	}

	makeBelieveElement.prototype.ancestor = function (selector = "") {
		return ancestorHandler(this.grandParent(),selector);
	}




	var innerMakebelieve = function (query) {
		/* wrapper for querying used by __(query)*/
		var element = document.querySelectorAll(query);
		if (element) {
			return new makeBelieveElement(element, element.length);
		}
		return {};
	}
	window.__ = innerMakebelieve;
})();