import { renderFullImage } from './render-full-image.js';
import { renderThumbs } from './render-thumbs.js';

/**
 * Функция обработки клика по превью картинки
 * @param {array} comments - массив с комментариями всех фото
 * @param {event} evt - событие
 * @returns {null}
 */
const thumbClickHandler = (comments, evt) => {
  renderFullImage(evt.target, comments[evt.target.dataset.id]);
};

/**
 * Функция отрисовки галерии изображений
 * @param {array} images - массив объектов карточек фото.
 * @returns {null}
 */
const renderGallery = (images) => {
  const [gallery, comments] = renderThumbs(images);
  gallery.addEventListener('click', (evt) => thumbClickHandler(comments, evt));
};

export { renderGallery };
