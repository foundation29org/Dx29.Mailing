function checkQueryParams(queryObject) {
    var message = null;
    var queryArrayKeys = []
    var queryArrayConditions = [];
    var queryObjectEntries = Object.entries(queryObject);
    for (var i = 0; i < queryObjectEntries.length; i++) {
      queryArrayKeys.push(queryObjectEntries[i][0])
      queryArrayConditions.push(queryObjectEntries[i][1])
    }
    var required = [];
    for (var i = 0; i < queryArrayConditions.length; i++) {
      if ((queryArrayConditions[i] === undefined)||(queryArrayConditions[i] === "")||(queryArrayConditions[i] === '')) {
        required.push(queryArrayKeys[i])
      }
    }
    if (required.length > 0) {
      message = "You must provide: " + required;
    }
    return message;
  }
  
  
  module.exports = {
    checkQueryParams
  }