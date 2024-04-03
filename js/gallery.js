import { fillFullImageData } from './full-image.js';
import { renderThumbs } from './render-thumbs.js';

/**
 * Функция обработки клика по превью картинки
 * @param {array} imagesData - массив с данными фотографий
 * @param {event} evt - событие
 */
const thumbClick = (imagesData, evt) => {
  if (evt.target.matches('.picture__img')) {
    const clickedImageData = imagesData.find((el) => el['id'] === parseInt(evt.target.dataset.id, 10));
    fillFullImageData(clickedImageData);
  }
};

/**
 * Функция отрисовки галерии изображений
 * @param {array} imagesData - массив с данными фотографий
 * @param {string} filter - установленный фильтр
 */
const renderGallery = (imagesData, filter) => {
  const gallery = renderThumbs(imagesData, filter);
  gallery.addEventListener('click', (evt) => thumbClick(imagesData, evt));
};

export { renderGallery };
