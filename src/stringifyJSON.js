// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  if (Array.isArray(obj)) {
    var arrayValues = '';
    for (var i = 0; i < obj.length; i++) {
      arrayValues += stringifyJSON(obj[i]) + ',';
    }
    arrayValues = arrayValues.substring(0, arrayValues.length - 1); //remove the last comma
    return '[' + arrayValues + ']';
  } else if ([null, Infinity, NaN, undefined, function() {}, Symbol('')].indexOf(obj) !== -1) {
    return 'null';
  } else if (typeof obj === 'object') { //i.e. it's an object but not an array
    var objectPairs = '';
    for (var key in obj) {
      if (['undefined', 'function', 'symbol'].indexOf(typeof obj[key]) === -1) {
        objectPairs += '"' + key + '"' + ':' + stringifyJSON(obj[key]) + ',';
      }
    }
    objectPairs = objectPairs.substring(0, objectPairs.length - 1); //remove the last comma
    return '{' + objectPairs + '}';
  } else if (typeof obj === 'string') {
    return '"' + obj + '"';
  } else {
    return obj.toString();
  }
};