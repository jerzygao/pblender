import md5 from 'md5.min.js';

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function calcPassword(passWord, key1, key2, mixedCase, length) {
  var passWord1 = md5(passWord, key1);
  var result = md5(passWord1, key2);
  var resultArray = result.split('');

  if (mixedCase) {
    var mixedCaseStr = md5(passWord1, 'mixedCaseKey');
    var matchingRuleStr = '12456adf';
    var mixedCaseStrArray = mixedCaseStr.split('');
    var hasUpperCace = false;
    for (var i = 1; i < 31; i++) {
      if (matchingRuleStr.search(mixedCaseStrArray[i]) > -1) {
        resultArray[i] = resultArray[i].toUpperCase();
        hasUpperCace = true;
      }
    }
    if (!hasUpperCace) {
      resultArray[0] = 'P';
    }
  }

  if (!isNaN(resultArray[0])) {
    resultArray[0] = 'P';
  }

  result = resultArray.join('');

  if (length > 6 && length < 32) {
    result = result.slice(0, length);
  }

  return result;
}


module.exports = {
  formatTime: formatTime,
  calcPassword: calcPassword
}