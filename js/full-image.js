import { isEscapeKey } from './util.js';

const DEFAUT_COMMENTS_COUNT_SHOW = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPicturePreviewElement = bigPictureElement.querySelector('.big-picture__preview');
const bigPicturePhotoContainerElement = bigPicturePreviewElement.querySelector('.big-picture__img');
const bigPictureImageElement = bigPicturePhotoContainerElement.querySelector('img');
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigPictureCommentsElement = bigPicturePreviewElement.querySelector('.social__comments');
const commentsLoaderElement = bigPicturePreviewElement.querySelector('.comments-loader');
const commentTemplateElement = bigPictureCommentsElement.lastElementChild.cloneNode(true);

let comments = [];
let currentCount = 0;


/**
 * Функция для очистки дефолтных комментариев
 */
const clearComments = () => {
  while (bigPictureCommentsElement.lastElementChild) {
    bigPictureCommentsElement.removeChild(bigPictureCommentsElement.lastElementChild);
  }
};


/**
 * Функция закрытия просмотра большого изображения
 */
const closeFullImage = () => {
  bigPictureElement.classList.add('hidden');
  document.removeEventListener('keydown', documentKeydownHandler);
  commentsLoaderElement.removeEventListener('click', commentsLoaderClickHandler);
  bigPictureCloseElement.removeEventListener('click', closeElementClickHandler);
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
 * Обработчик нажатия на элемент закрытия полного окна
 */
function closeElementClickHandler() {
  closeFullImage();
}


/**
 * Функция генерации html кода одного комментария
 * @param {str} avatar - пусть до аватарки автора
 * @param {str} nickname - имя автора
 * @param {str} commentText - текст комментация
 * @returns {HTMLElement} - html код одного комментария
 */
const renderComment = (avatar, nickname, commentText) => {
  const comment = commentTemplateElement.cloneNode(true);
  const commentAuthorAvatarElement = comment.querySelector('.social__picture');
  const commentTextElement = comment.querySelector('.social__text');
  commentAuthorAvatarElement.src = avatar;
  commentAuthorAvatarElement.alt = nickname;
  commentTextElement.textContent = commentText;
  return comment;
};


/**
 * Функция генерации html элемента блока комментариев
 * @param {array} imageComments - массив с комментариями к конкретной фото
 * @returns {HTMLElement} -  html элемент со списком комментариев
 */
const renderImageComments = () => {
  clearComments();
  const imageCommentsShow = comments.slice(0, currentCount + DEFAUT_COMMENTS_COUNT_SHOW);
  imageCommentsShow.forEach(({avatar, message, name}) => bigPictureCommentsElement.appendChild(renderComment(avatar, name, message)));
  commentsLoaderElement.addEventListener('click', commentsLoaderClickHandler);
  bigPicturePreviewElement.querySelector('.social__comment-shown-count').textContent = imageCommentsShow.length;
  if (imageCommentsShow.length >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};


/**
 * Функция открытия полного изображения
 * @param {array} clickedImageDataComments - массив комментариев к конкретной фото
 */
const openFullImage = (clickedImageDataComments) => {
  comments = clickedImageDataComments;
  currentCount = 0;
  bigPictureElement.classList.remove('hidden');
  document.addEventListener('keydown', documentKeydownHandler);
  document.body.classList.add('modal-open');
  bigPictureCloseElement.addEventListener('click', closeElementClickHandler);
  renderImageComments();
};

/**
 * Обработчик нажатия на кнопку загрузки дополнитеьных комментариев
 */
function commentsLoaderClickHandler() {
  currentCount += DEFAUT_COMMENTS_COUNT_SHOW;
  renderImageComments();
}


/**
 * Функция отрисовки большого изображения фото
 * @param {array} clickedImageComments - массив комментариев к картинке
 */
const fillFullImageData = (clickedImageData) => {
  bigPictureImageElement.src = clickedImageData.url;
  bigPicturePreviewElement.querySelector('.likes-count').textContent = clickedImageData.likes;
  bigPicturePreviewElement.querySelector('.social__comment-total-count').textContent = clickedImageData.comments.length;
  bigPictureImageElement.alt = bigPicturePreviewElement.querySelector('.social__caption').textContent = clickedImageData.description;
  commentsLoaderElement.classList.remove('hidden');
  openFullImage(clickedImageData.comments);
};


export { fillFullImageData };

