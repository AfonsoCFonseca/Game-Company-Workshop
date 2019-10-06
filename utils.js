
/******************        DATABASE         *****************/

var getFirebaseData = function getFirebaseData(functionName, callback) {
  $.ajax({
    url: '/' + functionName,
    dateType: 'json',
    success: function success(data) {
      callback(data);
    },
    error: function error(err) {
      console.log("err");
      console.log(err);
      if (err != null) {
        logginOut();
      }
    }
  });
};
var postFirebaseData = function postFirebaseData(obj, functionName, callback) {
  $.ajax({
    url: '/' + functionName,
    type: 'POST',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(obj),
    success: function success(resultData) {
      callback(resultData);
    },
    error: function error(err) {
      console.log("err");
      console.log(err);
      if (err != null) {
        logginOut();
      }
    }
  });
};