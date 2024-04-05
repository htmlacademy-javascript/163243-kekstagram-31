import { renderGallery } from './gallery.js';
import { isEscapeKey, debounce } from './util.js';
import { closeImageUploadForm } from './upload-image.js';

const BACKEND_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const TIME_OUT = 5;
const MILLISECONDS_IN_SECONDS = 1000;

const getDataErrorElementTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const getDataErrorElement = getDataErrorElementTemplate.cloneNode(true);
const sendDataErrorElementTemplate = document.querySelector('#error').content.querySelector('.error');
const sendDataErrorElement = sendDataErrorElementTemplate.cloneNode(true);
const sendDataSuccessElementTemplate = document.querySelector('#success').content.querySelector('.success');
const sendDataSuccessElement = sendDataSuccessElementTemplate.cloneNode(true);
const successButtonElement = sendDataSuccessElement.querySelector('.success__button');
const errorButtonElement = sendDataErrorElement.querySelector('.error__button');
const imageUploadSubmitButtonElement = document.querySelector('.img-upload__submit');
const imageFiltersElement = document.querySelector('.img-filters');
const imageFiltersFormElement = document.querySelector('.img-filters__form');
const uploadedImageEditOverlayElement = document.querySelector('.img-upload__overlay');


const api = {
  getData : {
    route: '/data',
    method: 'GET',
    errorText: 'Не удалось загрузить данные. Попробуйте обновить страницу',
    errorElement: getDataErrorElement,
    action: (imagesData, filter) => renderGallery(imagesData, filter),
  },
  sendData : {
    route: '/',
    method: 'POST',
    errorText: 'Не удалось загрузить данные. Попробуйте обновить страницу',
    errorElement: sendDataErrorElement,
    successElement: sendDataSuccessElement,
    action: () => showDataSuccess(),
  },
};

/**
 * Функция блокировки кнопки отправки формы
 */
const blockSubmitButton = () => {
  imageUploadSubmitButtonElement.disabled = true;
};

/**
 * Функция разблокировки кнопки отправки формы
 */
const unblockSubmitButton = () => {
  imageUploadSubmitButtonElement.disabled = false;
};


/**
 * Функция закрытия сообщения об успешной отправке данных
 */
const closeDataSuccessMsg = () => {
  document.body.removeChild(sendDataSuccessElement);
  document.removeEventListener('keydown', documentKeydownHandler);
  document.removeEventListener('click', documentClickHandler);
  document.body.classList.remove('modal-open');
  closeImageUploadForm();
};

/**
 * Функция закрытия сообщения об ошибке отправки данных
 */
const closeDataErrorMsg = () => {
  document.body.removeChild(sendDataErrorElement);
  document.removeEventListener('keydown', documentKeydownHandler);
  document.removeEventListener('click', documentClickHandler);
  document.body.classList.remove('modal-open');
  uploadedImageEditOverlayElement.classList.remove('hidden');
  unblockSubmitButton();
};

/**
 * Обработчик нажатия на кнопку закрытия сообщения об успешной отправке данных
 */
const successButtonClickHandler = () => closeDataSuccessMsg();

/**
 * Обработчик нажатия на кнопку закрытия сообщения об ошибке отправке данных
 */
const errorButtonClickHandler = () => closeDataErrorMsg();

/**
 * Обработчик клика по документу
 * @param {evt} evt - событие
 */
function documentClickHandler(evt) {
  if (sendDataSuccessElement.parentNode !== null && !evt.target.matches('.success__inner') && !evt.target.matches('.success__title')) {
    closeDataSuccessMsg();
  } else if (sendDataErrorElement.parentNode !== null && !evt.target.matches('.error__inner') && !evt.target.matches('.error__title')) {
    closeDataErrorMsg();
  }
}


/**
 * Функция обработки нажатия клавиши Esc
 * @param {evt} evt - событие.
 */
function documentKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (sendDataSuccessElement.parentNode !== null) {
      closeDataSuccessMsg();
    } else {
      closeDataErrorMsg();
    }
  }
}

/**
 * Обработчик нажатия на фильтр
 * @param {evt} evt - событие
 */
const clickFilterHandler = (evt) => {
  const activeFilter = imageFiltersFormElement.querySelector('.img-filters__button--active');
  if (activeFilter !== evt.target) {
    activeFilter.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    getData(evt.target.getAttribute('id').split('-')[1]);
  }
};

/**
 * Функция, показывающая сообщение об ошибке загрузки данных
 * @param {HTMLElement} errorElement - элемент сообщения об ошибке
 */
const showDataError = (errorElement) => {
  document.body.appendChild(errorElement);
  if (errorElement === api.getData.errorElement) {
    setTimeout(() => document.body.removeChild(errorElement), TIME_OUT * MILLISECONDS_IN_SECONDS);
    imageFiltersElement.classList.add('img-filters--inactive');
    return;
  }
  errorButtonElement.addEventListener('click', errorButtonClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
  document.addEventListener('click', documentClickHandler);
  document.body.classList.remove('modal-open');
};

/**
 * Функция, показывающая сообщение об успешной отправке данных на сервер
 */
function showDataSuccess() {
  document.body.appendChild(sendDataSuccessElement);
  successButtonElement.addEventListener('click', successButtonClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
  document.addEventListener('click', documentClickHandler);
  document.body.classList.remove('modal-open');
}


/**
 * Функция отправки запроса на сервер
 * @param {obj} api - destructed - объект API
 * @param {obj} body - обект с данными для отправки на сервер, по умолчанию null
 * @param {string} - строка со значением фильтра
 */
const sendRequest = ({route, method, errorElement, action}, body = null, filter = null) =>
  fetch(`${BACKEND_URL}${route}`, {method, body})
    .then(blockSubmitButton())
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((data) => action(data, filter))
    .catch(() => showDataError(errorElement))
    .finally(unblockSubmitButton());


/**
 * Функция получения данных с сервера
 * @param {string} chosenFilter - строка с установленным фильтром
 */
function getData(chosenFilter = 'default') {
  sendRequest(api.getData, null, chosenFilter)
    .then(() => {
      imageFiltersElement.classList.remove('img-filters--inactive');
      imageFiltersFormElement.addEventListener('click', debounce(clickFilterHandler));
    });

}

/**
 * Функция отправки данных на сервер
 * @param {obj} body - объект с отправляемыми данными
 */
const sendData = (body) => sendRequest(api.sendData, body)
  .then(() => blockSubmitButton());

export { getData, sendData, blockSubmitButton };
