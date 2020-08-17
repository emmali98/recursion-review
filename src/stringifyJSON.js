// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  //input = object
  var stringified = '';

  if (Array.isArray(obj)) {
    var arrayValues = '';
    for (var i = 0; i < obj.length; i++) {
      arrayValues += stringifyJSON(obj[i]) + ',';
    }
    arrayValues = arrayValues.substring(0, arrayValues.length - 1); //remove the last comma
    return '[' + arrayValues + ']';
  } else if (typeof obj !== 'boolean' && typeof obj !== 'number' && !obj) {
    return 'null';
  } else if (typeof obj === 'object') { //i.e. it's an object but not an array
    var objectPairs = '';
    for (var key in obj) {
      objectPairs += '"' + key + '"' + ':' + stringifyJSON(obj[key]) + ',';
    }
    objectPairs = objectPairs.substring(0, objectPairs.length - 1); //remove the last comma
    return '{' + objectPairs + '}';
  } else if (typeof obj === 'string') {
    return '"' + obj + '"';
  } else { //more else ifs may be needed
    return obj.toString();
  }



};