import { isEscapeKey } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPicturePreviewElement = bigPictureElement.querySelector('.big-picture__preview');
const bigPicturePhotoContainerElement = bigPicturePreviewElement.querySelector('.big-picture__img');
const bigPictureImageElement = bigPicturePhotoContainerElement.querySelector('img');
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');


const documentKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullImage();
  }
};

const closeFullImage = () => {
  bigPictureCloseElement.parentElement.parentElement.classList.add('hidden');
  document.removeEventListener('keydown', documentKeydownHandler);
  document.body.classList.remove('modal-open');
};

const openFullImage = () => {
  bigPictureElement.classList.remove('hidden');
  document.addEventListener('keydown', documentKeydownHandler);
  document.body.classList.add('modal-open');
};

const renderFullImage = (clickedImage) => {
  const photoCardElement = clickedImage.parentElement;
  bigPictureImageElement.src = clickedImage.src;
  bigPicturePreviewElement.querySelector('.likes-count').textContent = photoCardElement.querySelector('.picture__info').querySelector('.picture__likes').textContent;
  bigPicturePreviewElement.querySelector('.social__comment-shown-count').textContent = 133;
  bigPicturePreviewElement.querySelector('.social__comment-total-count').textContent = photoCardElement.querySelector('.picture__info').querySelector('.picture__comments').textContent;
  bigPictureImageElement.alt = bigPicturePreviewElement.querySelector('.social__caption').textContent = clickedImage.alt;
  // скрываем на потом
  bigPicturePreviewElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPicturePreviewElement.querySelector('.comments-loader').classList.add('hidden');
  //
  openFullImage(bigPictureElement);

  // console.log(clickedImage.parentElement);
  // console.log(clickedImage.alt);
};

bigPictureCloseElement.addEventListener('click', () => {
  closeFullImage();
});


export { renderFullImage };

