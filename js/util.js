/**
 * Функция проверки нажатия Esc
 * @param {event} evt - событие
 * @returns {boolean} - true, если нажат Esc, false в других случаях
 */
const isEscapeKey = (evt) => evt.key === 'Escape';

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

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { isEscapeKey, getRandomInteger, debounce };
