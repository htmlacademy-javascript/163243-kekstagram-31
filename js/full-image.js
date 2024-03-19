import { isEscapeKey, renderComment } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPicturePreviewElement = bigPictureElement.querySelector('.big-picture__preview');
const bigPicturePhotoContainerElement = bigPicturePreviewElement.querySelector('.big-picture__img');
const bigPictureImageElement = bigPicturePhotoContainerElement.querySelector('img');
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
const photoCardComments = bigPicturePreviewElement.querySelector('.social__comments');

/**
 * Функция закрытия просмотра большого изображения
 */
const closeFullImage = () => {
  bigPictureCloseElement.parentElement.parentElement.classList.add('hidden');
  document.removeEventListener('keydown', documentKeydownHandler);
  document.body.classList.remove('modal-open');
};

/**
 * Функция обработки нажатия клавиши Esc
 * @param {evt} evt - событие.
 */
function documentKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullImage();
  }
}


/**
 * Функция открытия просмотра большого изображения
 */
const openFullImage = () => {
  bigPictureElement.classList.remove('hidden');
  document.addEventListener('keydown', documentKeydownHandler);
  document.body.classList.add('modal-open');
  bigPictureCloseElement.addEventListener('click', () => {
    closeFullImage();
  });
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
const renderFullImage = (clickedImageData) => {
  bigPictureImageElement.src = clickedImageData.url;
  bigPicturePreviewElement.querySelector('.likes-count').textContent = clickedImageData.likes;
  bigPicturePreviewElement.querySelector('.social__comment-shown-count').textContent = clickedImageData.comments.length;
  bigPicturePreviewElement.querySelector('.social__comment-total-count').textContent = clickedImageData.comments.length;
  bigPictureImageElement.alt = bigPicturePreviewElement.querySelector('.social__caption').textContent = clickedImageData.description;
  // скрываем на потом
  // bigPicturePreviewElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPicturePreviewElement.querySelector('.comments-loader').classList.add('hidden');
  photoCardComments.innerHTML = renderImageComments(clickedImageData.comments);
  openFullImage(photoCardComments);

  // console.log(renderImageComments(clickedImageComments));
};


export { renderFullImage };

