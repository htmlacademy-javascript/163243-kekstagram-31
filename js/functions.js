function checkStringLength(string, length) {
  return string.length <= length;
}

function isPalindrom(string) {
  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  const reverseString = normalizedString.split('').reverse().join('');
  return reverseString === normalizedString;
}

function findDigits(string) {
  let result = '';
  if (typeof(string) !== String) {
    string = string + '';
  }

  for (let i = 0; i < string.length; i++) {
    if(isNaN(parseInt(string[i], 10))) {
      continue;
    }
    result += string[i];
  }
  return result ? parseInt(result, 10) : NaN;
}
