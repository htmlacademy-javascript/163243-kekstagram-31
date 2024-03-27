import { isEscapeKey } from './util.js';
import { handleScale } from './scale.js';

const HASHTAGS_COUNT_LIMIT = 5;
const DESCRIPTION_LENGTH_LIMIT = 140;

const Validations = [];
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const imageUploadElement = document.querySelector('.img-upload');
const uploadedImageEditOverlayElement = imageUploadElement.querySelector('.img-upload__overlay');
const uploadedImageEditFormElement = imageUploadElement.querySelector('.img-upload__form');
const closeUploadedImageEditFormElement = imageUploadElement.querySelector('.img-upload__cancel');
// const inputImageFileUploadElement = imageUploadElement.querySelector('.img-upload__input');
const inputHashtagsElement = imageUploadElement.querySelector('.text__hashtags');
const inputDescriptionElement = imageUploadElement.querySelector('.text__description');

const pristine = new Pristine(uploadedImageEditFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);


const hashtagChangeHandler = () => pristine.validate();
const stopKeydownHandler = (evt) => evt.stopPropagation();

/**
 * Обработчки события загрузки изображения
 */
const uploadImageHandler = () => {
  uploadedImageEditOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeUploadedImageEditFormElement.addEventListener('click', closeElementClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);

};


/**
 * Функция закрытия формы редактирования загруженного изображения
 */
const closeImageUploadForm = () => {
  uploadedImageEditOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', documentKeydownHandler);
  closeUploadedImageEditFormElement.removeEventListener('click', closeElementClickHandler);
  uploadedImageEditFormElement.reset();
  pristine.reset();
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


/**
 * Функция - интерфейс модуля загрузки изображений
 */
const handleImageUpload = () => {

  inputHashtagsElement.addEventListener('input', hashtagChangeHandler);
  inputHashtagsElement.addEventListener('keydown', stopKeydownHandler);
  inputDescriptionElement.addEventListener('keydown', stopKeydownHandler);
  imageUploadElement.addEventListener('change', uploadImageHandler);

  let clearedHashtagsToValidate = [];


  /**
   * Валидация хештегов на соответвтие регулярному выражению
   * @param {string} hashtags - строка с хештегами
   * @returns {boolean} - правда, если все хештеги соответствуют регулярке (иначе - ложь)
   */
  const validateHashtagsRegexp = (hashtags) => {
    const hashtagsToValidate = hashtags.trim().toLowerCase().split(' ');
    clearedHashtagsToValidate = hashtagsToValidate.filter(Boolean);
    return clearedHashtagsToValidate.every((hashtag) => HASHTAG_REGEXP.test(hashtag));
  };

  /**
 * Проверка, что нет дубликатов в хештегах
 * @returns {boolean} - правда, если дубликатов нет, иначе - ложь
 */
  const validateHashtagsDuplicates = () => {
    if (clearedHashtagsToValidate) {
      const duplicates = clearedHashtagsToValidate.filter((element, index, elements) => elements.indexOf(element) !== index);
      return !duplicates.length;
    }
  };

  /**
   * Проверка количества хештегов
   * @returns {boolean} - правда, если менее, чем положено, иначе - ложь
   */
  const validateHashtagsCount = () => clearedHashtagsToValidate.length <= HASHTAGS_COUNT_LIMIT;

  /**
   * Проверка длины описания
   * @param {string} description - строка описания
   * @returns {boolean} - правда, если описание короче, чем установлено ограничением
   */
  const validateDescription = (description) => description.length <= DESCRIPTION_LENGTH_LIMIT;

  Validations.push([inputHashtagsElement, validateHashtagsRegexp, 'Хештеги должны начинаться с #, содержать 1-19 букв без спецсимволов']);
  Validations.push([inputHashtagsElement, validateHashtagsDuplicates, 'Хештеги не должны повторяться']);
  Validations.push([inputHashtagsElement, validateHashtagsCount, 'Не более 5 хештегов']);
  Validations.push([inputDescriptionElement, validateDescription, 'Ограничение 140 символов для описания']);

  Validations.forEach((elem) => pristine.addValidator(elem[0],elem[1],elem[2]));

  uploadedImageEditFormElement.addEventListener('submit', () => {
    // evt.preventDefault();
    pristine.validate();
  });

  handleScale();
};


export { handleImageUpload };
