/**
 * Функция для проверки длины строки.
 * @param {string} string - проверямая строка.
 * @param {*} length - максимальная длина строки.
 * @returns {boolean} - возвращет true, если длина строки меньше или равна максимальной длине.
 */
function checkStringLength(string, length) {
  return string.length <= length;
}

checkStringLength('проверяемая строка', 20); // true
checkStringLength('проверяемая строка', 18); // true
checkStringLength('проверяемая строка', 10); // false

/**
 * Функция проверяет строку является ли она полиндромом.
 * @param {string} string - проверяемая строка.
 * @returns {boolean} - возвращает true, если строка - полиндром.
 */
function isPalindrom(string) {
  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  const reverseString = normalizedString.split('').reverse().join('');
  return reverseString === normalizedString;
}

isPalindrom('топот'); // true
isPalindrom('ДовОд'); // true
isPalindrom('Кекс'); // false
isPalindrom('Лёша на полке клопа нашёл '); // true

/**
 * Функция находит в строке или числе цифры.
 * @param {*} string - проверямые входные данные.
 * @returns {number} - возвращает целочисленное значение из цирф или NaN, если ни одной цифры не нашлось.
 */
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

findDigits('2023 год'); // 2023
findDigits('ECMAScript 2022'); // 2022
findDigits('1 кефир, 0.5 батона'); // 105
findDigits('агент 007'); // 7
findDigits('а я томат'); // NaN
findDigits(2023); // 2023
findDigits(-1); // 1
findDigits(1.5); // 15
