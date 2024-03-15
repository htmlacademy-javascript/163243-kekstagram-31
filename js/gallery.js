import { renderFullImage } from './render-full-image.js';
import { renderThumbs } from './render-thumbs.js';

/**
 * Функция обработки клика по превью картинки
 * @param {eventt} evt - событие
 */
const thumbClickHandler = (evt) => {
  renderFullImage(evt.target);
};

/**
 * Функция отрисовки галерии изображений
 * @param {array} images - массив объектов карточек фото.
 */
const renderGallery = (images) => {
  const gallery = renderThumbs(images);
  gallery.addEventListener('click', thumbClickHandler);
};

export { renderGallery };
