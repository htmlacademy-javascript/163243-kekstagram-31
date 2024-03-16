/**
 * Функция проверки нажатия Esc
 * @param {event} evt - событие
 * @returns {boolean} - true, если нажат Esc, false в других случаях
 */
const isEscapeKey = (evt) => evt.key === 'Escape';

/**
 * Функция генерации html кода одного комментария
 * @param {str} avatar - пусть до аватарки автора
 * @param {str} nickname - имя автора
 * @param {str} commentText - текст комментация
 * @returns {str} - html код одного комментария
 */
const renderComment = (avatar, nickname, commentText) => {
  const commentElement =
  `<li class="social__comment">
  <img
    class="social__picture"
    src="${avatar}"
    alt="${nickname}"
    width="35" height="35">
  <p class="social__text">${commentText}</p>
</li>`;
  return commentElement;

};

export { isEscapeKey, renderComment };
