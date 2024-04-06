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
const getRandomInteger = (firstNumber, secondNumber) => {
  const lower = Math.ceil(Math.min(firstNumber, secondNumber));
  const upper = Math.floor(Math.max(firstNumber, secondNumber));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * Функция устранения дребезга
 * @param {fn} callback - колбэк, который оборачиваем
 * @param {int} timeoutDelay - задержка в мс
 * @returns {fn} - колбэк с задержкой
 */
function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { isEscapeKey, getRandomInteger, debounce };
