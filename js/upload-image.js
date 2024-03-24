import { isEscapeKey } from './util.js';

const imageUploadElement = document.querySelector('.img-upload');
const uploadedImageEditFormElement = imageUploadElement.querySelector('.img-upload__overlay');
const closeUploadedImageEditFormElement = imageUploadElement.querySelector('.img-upload__cancel');
const inputImageFileUploadElement = imageUploadElement.querySelector('.img-upload__input');
const inputHashtagsElement = imageUploadElement.querySelector('.text__hashtags');
const inputDescriptionElement = imageUploadElement.querySelector('.text__description');


const clearImageUploadFormInputs = () => {
  inputImageFileUploadElement.value = '';
  inputHashtagsElement.value = '';
  inputDescriptionElement.value = '';
};

const uploadImageHandler = () => {
  uploadedImageEditFormElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeUploadedImageEditFormElement.addEventListener('click', closeElementClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
};


const closeImageUploadForm = () => {
  uploadedImageEditFormElement.classList.add('hidden');
  document.removeEventListener('keydown', documentKeydownHandler);
  closeUploadedImageEditFormElement.removeEventListener('click', closeElementClickHandler);
  document.body.classList.remove('modal-open');
  clearImageUploadFormInputs();
};

/**
 * Обработчик нажатия на элемент закрытия полного окна
 */
function closeElementClickHandler() {
  closeImageUploadForm();
}


/**
 * Функция обработки нажатия клавиши Esc
 * @param {evt} evt - событие.
 */
function documentKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageUploadForm();
  }
}

const handleImageUpload = () => {
  imageUploadElement.addEventListener('change', uploadImageHandler);
};

export { handleImageUpload };
