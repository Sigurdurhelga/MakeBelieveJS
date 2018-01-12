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
			if(nextSibling){
				allNextSiblings.push(nextSibling);
			}
		}
		return new makeBelieveElement(allNextSiblings, allNextSiblings.length);
	};

	makeBelieveElement.prototype.previousSibling = function() {
		/*
			This function takes a makeBelieveElement and goes
			through every element it represents and gets the 
			previous sibling to those elements and returns 
			a new makeBelieveElement
		*/

		var allPreviousSiblings = [];
		for (let index = 0; index < this.length; index++) {
			const previousSibling = this[index].previousElementSibling;
			if(previousSibling){
				allPreviousSiblings.push(previousSibling);
			}
		}
		return new makeBelieveElement(allPreviousSiblings, allPreviousSiblings.length);

	}

	var innerMakebelieve = function(query){
		/* wrapper for querying used by __(query)*/
		var element = document.querySelectorAll(query);
		if(element){
			return new makeBelieveElement(element, element.length);
		}
		return {};
	}
	window.__ = innerMakebelieve;
})();