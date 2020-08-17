// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

//document.body, element.childNodes, and element.classList

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
) {
  var getAllElementsByClassNameInsideElement = function(className, element) {
    var elementsWithClass = [];
    if (element.classList && element.classList.contains(className)) {
      elementsWithClass.push(element);
    }
    if (element.childNodes) {
      for (child of element.childNodes) {
        elementsWithClass = elementsWithClass.concat(getAllElementsByClassNameInsideElement(className, child));
      }
    }
    return elementsWithClass;
  };

  return getAllElementsByClassNameInsideElement(className, document.body);
};
