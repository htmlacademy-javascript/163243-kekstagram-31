import { isEscapeKey, renderComment } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPicturePreviewElement = bigPictureElement.querySelector('.big-picture__preview');
const bigPicturePhotoContainerElement = bigPicturePreviewElement.querySelector('.big-picture__img');
const bigPictureImageElement = bigPicturePhotoContainerElement.querySelector('img');
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');

/**
 * Функция обработки нажатия клавиши Esc
 * @param {evt} evt - событие.
 * @returns {null}
 */
const documentKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullImage();
  }
};

/**
 * Функция закрытия просмотра большого изображения
 * @returns {null}
 */
const closeFullImage = () => {
  bigPictureCloseElement.parentElement.parentElement.classList.add('hidden');
  document.removeEventListener('keydown', documentKeydownHandler);
  document.body.classList.remove('modal-open');
};

/**
 * Функция открытия просмотра большого изображения
 * @returns {null}
 */
const openFullImage = () => {
  bigPictureElement.classList.remove('hidden');
  document.addEventListener('keydown', documentKeydownHandler);
  document.body.classList.add('modal-open');
};

/**
 * Функция генерации html кода комментариев
 * @param {array} imageComments - массив с комментариями к конкретной фото
 * @returns {string} - строка с html кодом комментариев
 */
const renderImageComments = (imageComments) => {
  let imageCommentsFeed = '';
  imageComments.forEach(({avatar, message, name}) => {
    imageCommentsFeed += renderComment(avatar, name, message);
  });
  return imageCommentsFeed;
};

/**
 * Функция отрисовки большого изображения фото
 * @param {obj} clickedImage - картинка, по которому кликнули
 * @param {array} clickedImageComments - массив комментариев к картинке
 * @returns {null}
 */
const renderFullImage = (clickedImage, clickedImageComments) => {
  const photoCardElement = clickedImage.parentElement;
  const photoCardComments = bigPicturePreviewElement.querySelector('.social__comments');
  bigPictureImageElement.src = clickedImage.src;
  bigPicturePreviewElement.querySelector('.likes-count').textContent = photoCardElement.querySelector('.picture__info').querySelector('.picture__likes').textContent;
  // вопрос тут
  bigPicturePreviewElement.querySelector('.social__comment-shown-count').textContent = clickedImageComments.length;
  bigPicturePreviewElement.querySelector('.social__comment-total-count').textContent = photoCardElement.querySelector('.picture__info').querySelector('.picture__comments').textContent;
  bigPictureImageElement.alt = bigPicturePreviewElement.querySelector('.social__caption').textContent = clickedImage.alt;
  // скрываем на потом
  // bigPicturePreviewElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPicturePreviewElement.querySelector('.comments-loader').classList.add('hidden');
  photoCardComments.innerHTML = renderImageComments(clickedImageComments);
  openFullImage(bigPictureElement);

  // console.log(renderImageComments(clickedImageComments));
  // console.log(clickedImageComments);
};

bigPictureCloseElement.addEventListener('click', () => {
  closeFullImage();
});


export { renderFullImage };

