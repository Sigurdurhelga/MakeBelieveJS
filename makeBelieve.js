/*
  Skeleton from teacher Arnar Leifsson.
  */
(function() {
  function makeBelieveElement(element, length) {
    let i = 0;
    element.forEach(element => {
      this[i] = element;
      i += 1;
    });
    this.length = length;
  }

  /* begin methods */

  makeBelieveElement.prototype.nextSibling = function() {
    /*
      This function takes a makeBelieveElement and goes
      through every element it represents and gets the
      next sibling to those elements, and returns them
      in a new makeBelieveElement
      */
    let allNextSiblings = [];
    for (let index = 0; index < this.length; index++) {
      const nextSibling = this[index].nextElementSibling;
      if (nextSibling) {
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
    let allPreviousSiblings = [];
    for (let index = 0; index < this.length; index++) {
      const previousSibling = this[index].previousElementSibling;
      if (previousSibling) {
        allPreviousSiblings.push(previousSibling);
      }
    }
    return new makeBelieveElement(
      allPreviousSiblings,
      allPreviousSiblings.length
    );
  };

  function nodelistContains(nodelist, element) {
    nodelist.forEach(el => {
      if (el == element) {
        return true;
      }
    });
    return false;
  }

  makeBelieveElement.prototype.parent = function(selector="") {
    /*
      returns every parent of every item in the makebelieve element.
      Can be filtered by a optional css selector
      */

    // make a nodelist of parents that I allow if the user asks for a filtered version
    let possibleParents = "";
    if (selector != "") {
      possibleParents = document.querySelectorAll(selector);
    }
    let allParents = [];
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
  };

  makeBelieveElement.prototype.grandParent = function(selector="") {
    /* returns a parent's parent */
    return this.parent().parent(selector);
  };

  function ancestorHelper(element, parentSelector) {
    // get all items which match the parent selector
    let parents = document.querySelectorAll(parentSelector);
    // read up until a parent with the correct selector is found, null is returned if none are found.
    let currentParent = element.parentNode;
    while (currentParent && !nodelistContains(parents, currentParent)) {
      currentParent = currentParent.parentNode;
    }
    return currentParent;
  }

  function ancestorHandler(makebelieve, selector) {
    /*
      returns any ancestor of an item which is greater than a grandparent to it
      can be filtered by an optional css selector
      */
    let allAncestors = [];
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
          allAncestors.push(ancestor);
        }
      }
    }
    return new makeBelieveElement(allAncestors, allAncestors.length);
  }

  makeBelieveElement.prototype.ancestor = function(selector="") {
    return ancestorHandler(this.grandParent(), selector);
  };

  makeBelieveElement.prototype.onClick = function(fn) {
    // creates an onclick event with function fn on every item inside the makebelieve object
    for (let index = 0; index < this.length; index++) {
      this[index].addEventListener("click", fn);
    }
  };

  makeBelieveElement.prototype.insertText = function(text) {
    // replaces all textcontent in all elements inside the makebelieveobject with text
    for (let index = 0; index < this.length; index++) {
      this[index].textContent = text;
    }
  };

  function isValidHTML(html) {
    // takes in a possible html snippet and returns true if it is valid html, false otherwise.
    let element = document.createElement("div");
    element.innerHTML = html;
    return element.innerHTML === html;
  }

  makeBelieveElement.prototype.append = function(item) {
    // append item, it can either be text or a valid DOM element.
    // check if the item is a valid DOM element
    if (item instanceof Element || item instanceof Node) {
      for (let index = 0; index < this.length; index++) {
        this[index].appendChild(item.cloneNode(true));
      }
    } else if (isValidHTML(item)) {
      for (let index = 0; index < this.length; index++) {
        this[index].insertAdjacentHTML("beforeend", item);
      }
    } else {
      throw "invalid input";
    }
  };

  makeBelieveElement.prototype.prepend = function(item) {
    // append item, it can either be text or a valid DOM element.
    // check if the item is a valid DOM element
    if (item instanceof Element || item instanceof Node) {
      for (let index = 0; index < this.length; index++) {
        this[index].insertBefore(item.cloneNode(true), this[index].firstChild);
      }
    } else if (isValidHTML(item)) {
      for (let index = 0; index < this.length; index++) {
        this[index].insertAdjacentHTML('afterbegin',item);
      }
    } else {
      throw "invalid input";
    }
  };

  makeBelieveElement.prototype.delete = function() {
    for (let index = 0; index < this.length; index++) {
      this[index].parentNode.removeChild(this[index]);
    }
  }

  makeBelieveElement.prototype.css = function(key, value) {
    for (let index = 0; index < this.length; index++) {
      this[index].style[key] = value;
    }
  }

  makeBelieveElement.prototype.toggleClass = function(className) {
    for (let index = 0; index < this.length; index++) {
      this[index].classList.toggle(className);
    }
  }

  makeBelieveElement.prototype.onSubmit = function(fn) {
    // creates an onsubmit event with function fn on every item inside the makebelieve object
    for (let index = 0; index < this.length; index++) {
      this[index].addEventListener("submit", fn);
    }
  };

  makeBelieveElement.prototype.onInput = function(fn) {
    // creates an oninput event with function fn on every item inside the makebelieve object
    for (let index = 0; index < this.length; index++) {
      this[index].addEventListener("input", fn);
    }
  };

  let innerMakebelieve = function(query) {
    /* wrapper for querying used by __(query)*/
    let element = document.querySelectorAll(query);
    if (element) {
      return new makeBelieveElement(element, element.length);
    }
    return {};
  };

  innerMakebelieve.ajax = function(request={url:'',
                                    method: 'GET',
                                    timeout: 0,
                                    data: {},
                                    header: {},
                                    success: null,
                                    failed: null,
                                    beforeSend: null
                                  }) {
    if (request.url === '') {
      console.log("No url");
      return;
    }

    xhr = new XMLHttpRequest();
    xhr.open(request.method, request.url);
    xhr.timeout = request.timeout;

    xhr.onload = request.success;
    xhr.onerror = request.failed;

    for (let header in request.headers) {
      xhr.setRequestHeader(header, request.headers[header]);
    }

    if(request.beforeSend) {
      request.beforeSend(xhr);
    }
    xhr.send(request.data);
  };

  window.__ = innerMakebelieve;
}
)();
