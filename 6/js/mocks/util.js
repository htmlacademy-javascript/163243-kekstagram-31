/**
 * Функция для генерации рандомного целого числа из диапазона
 * @param {integer} a -  одна из границ диапазона
 * @param {integer} b - вторая граница диапазона
 * @returns {integer} - возвращает случайное число
 */
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * Функция для выбора рандомного элемента массива
 * @param {array} elements - исходный массив
 * @returns {*} возвращает рандомный элемент
 */
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

/**
 * Функция для генерации рандомного комментария/описания
 * @param {array} textArray - массив с текстом из которого выбираем предложения.
 * @returns {string} - возвращает строку из 1 или 2 предложений
 */
const getRandomText = (textArray) => Array.from({length: getRandomInteger(1,2)}, () => getRandomArrayElement(textArray.split('\n'))).join(' ');

/**
 * Функция для генератоции уникальных возрастающих ID
 * @returns {function} - возвращает функцию, которая генерирует новый идентификатор.
 */
const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => ++lastGeneratedId;
};

export {getRandomInteger, getRandomArrayElement, getRandomText, createIdGenerator};
