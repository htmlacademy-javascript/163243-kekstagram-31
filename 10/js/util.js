/**
 * Функция проверки нажатия Esc
 * @param {event} evt - событие
 * @returns {boolean} - true, если нажат Esc, false в других случаях
 */
const isEscapeKey = (evt) => evt.key === 'Escape';


export { isEscapeKey };
