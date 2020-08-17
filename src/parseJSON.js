// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  json = json.trim();
  if (json[0] === '{' && json.slice(-1) === '}') {
    return parseObject(json.slice(1, -1));
  } else if (json[0] === '[' && json.slice(-1) === ']') {
    return parseArray(json.slice(1, -1));
  } else {
    return parseValue(json);
  }
};

var nextChar = function (string, stopChar) {
  var countOpenBracket = 0;
  var countCloseBracket = 0;
  var countOpenCurlyBrace = 0;
  var countCloseCurlyBrace = 0;
  var countQuotationMark = 0;

  for (var i = 0; i < string.length; i++) {
    if (string[i] === '[') {
      countOpenBracket++;
    } else if (string[i] === ']') {
      countCloseBracket++;
    } else if (string[i] === '{') {
      countOpenCurlyBrace++;
    } else if (string[i] === '}') {
      countCloseCurlyBrace++;
    } else if (string[i] === '"') {
      countQuotationMark++;
    }

    if (countOpenBracket === countCloseBracket && countOpenCurlyBrace === countCloseCurlyBrace && countQuotationMark % 2 === 0) {
      if (string[i] === stopChar) {
        return i;
      }
    }
  }
  return -1;
};

var parseArray;

var parseObject = function(string) { //input = string with the outer braces removed
  var obj = {};
  if (string === '') {
    return obj;
  } else if (nextChar(string, ',') === -1) {
    return parsePair(string);
  } else {
    obj = parsePair(string.substring(0, nextChar(string, ',')));
    var members = parseObject(string.substring(nextChar(string, ',') + 1).trim());
    for (var key in members) {
      obj[key] = members[key];
    }
  }
  return obj;
};

var parsePair = function(string) {
  var pair = {};
  var colonIdx = string.indexOf(':');
  var key = parseValue(string.substring(0, colonIdx));
  var value = parseJSON(string.substring(colonIdx + 1));
  pair[key] = value;
  return pair;
};

//var parseElements;

var parseValue = function(string) {
  //if it has quotation marks then it's a string
  if (string === '""') {
    return '';
  } else if (string[0] === '"' && string.slice(-1) === '"') {
    return string.slice(1, -1);
  } else if (string === 'true') {
    return true;
  } else if (string === 'false') {
    return false;
  } else if (string === 'null') {
    return null;
  } else if (string === 'undefined') {
    return undefined;
  } else {
    return Number(string);
  }
};
