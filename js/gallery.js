import { fillFullImageData } from './full-image.js';
import { renderThumbs } from './render-thumbs.js';

/**
 * Функция обработки клика по превью картинки
 * @param {array} comments - массив с комментариями всех фото
 * @param {event} evt - событие
 * @returns {null}
 */
const thumbClick = (imagesData, evt) => {
  if (evt.target.matches('.picture__img')) {
    const clickedImageData = imagesData.find((el) => el['id'] === parseInt(evt.target.dataset.id, 10));
    fillFullImageData(clickedImageData);
  }
};

/**
 * Функция отрисовки галерии изображений
 * @param {array} images - массив объектов карточек фото.
 * @returns {null}
 */
const renderGallery = (imagesData) => {
  const gallery = renderThumbs(imagesData);
  gallery.addEventListener('click', (evt) => thumbClick(imagesData, evt));
};

export { renderGallery };
