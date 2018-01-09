function __(cssSelector) {
  var selections = cssSelector.split(" ");
  var items = [];
  for (var i = 0; i < selections.length; i++) {
    var selection = selections[i];
    console.log(
      "looking at item " +
        selection +
        " sliced " +
        selection.slice(1, selection.length)
    );
    if (selection.startsWith("#")) {
      items.push(document.getElementById(selection.slice(1, selection.length)));
    } else if (selection.startsWith(".")) {
      var itemsInClass = document.getElementsByClassName(
        selection.slice(1, selection.length)
      );
      console.log(itemsInClass);
      if (itemsInClass.length != 0) {
        [itemsInClass].forEach((element, ind, arr) => {
          items.push(element);
        });
      }
    }
  }
  console.log(items);
}

__("hello .testclass world");