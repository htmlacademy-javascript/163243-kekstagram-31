import { renderGallery } from './gallery.js';
import { isEscapeKey } from './util.js';

const getDataErrorElementTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const getDataErrorElement = getDataErrorElementTemplate.cloneNode(true);
const sendDataErrorElementTemplate = document.querySelector('#error').content.querySelector('.error');
const sendDataErrorElement = sendDataErrorElementTemplate.cloneNode(true);
const sendDataSuccessElementTemplate = document.querySelector('#success').content.querySelector('.success');
const sendDataSuccessElement = sendDataSuccessElementTemplate.cloneNode(true);
const successButtonElement = sendDataSuccessElement.querySelector('.success__button');
const errorButtonElement = sendDataErrorElement.querySelector('.error__button');


const BACKEND_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const TIME_OUT = 5;
const MILLISECONDS_IN_SECONDS = 1000;

const api = {
  getData : {
    route: '/data',
    method: 'GET',
    errorText: 'Не удалось загрузить данные. Попробуйте обновить страницу',
    errorElement: getDataErrorElement,
  },
  sendData : {
    route: '/',
    method: 'POST',
    errorText: 'Не удалось загрузить данные. Попробуйте обновить страницу',
    errorElement: sendDataErrorElement,
    successElement: sendDataSuccessElement,
  },
};

const closeDataSuccess = () => {
  document.body.removeChild(sendDataSuccessElement);
  document.removeEventListener('keydown', documentKeydownHandler);
  document.removeEventListener('click', documentClickHandler);
  document.body.classList.remove('modal-open');
};

const closeDataError = () => {
  document.body.removeChild(sendDataErrorElement);
  document.removeEventListener('keydown', documentKeydownHandler);
  document.removeEventListener('click', documentClickHandler);
  document.body.classList.remove('modal-open');
};


const successButtonClickHandler = () => closeDataSuccess();
const errorButtonClickHandler = () => closeDataError();

function documentClickHandler() {
  const _ = (sendDataSuccessElement.parentNode !== null) ? closeDataSuccess() : closeDataError();
}


/**
 * Функция обработки нажатия клавиши Esc
 * @param {evt} evt - событие.
 */
function documentKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const _ = (sendDataSuccessElement.parentNode !== null) ? closeDataSuccess() : closeDataError();
  }
}


/**
 * Функция, показывающая сообщение об ошибке загрузки данных
 * @param {int} timeout - сколько секунда показываем сообщение об ошибке
 */
const showDataError = (errorElement) => {
  document.body.appendChild(errorElement);
  if (errorElement === api.getData.errorElement) {
    setTimeout(() => document.body.removeChild(errorElement), TIME_OUT * MILLISECONDS_IN_SECONDS);
    return;
  }
  errorButtonElement.addEventListener('click', errorButtonClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
  document.addEventListener('click', documentClickHandler);
  document.body.classList.add('modal-open');
};

const showDataSuccess = () => {
  document.body.appendChild(sendDataSuccessElement);
  successButtonElement.addEventListener('click', successButtonClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
  document.addEventListener('click', documentClickHandler);
  document.body.classList.add('modal-open');
};

/**
 * Функция отправки запроса на сервер
 * @param {obj} api - destructed - объект API
 * @param {obj} body - обект с данными для отправки на сервер
 */
const sendRequest = ({route, errorText, method, errorElement}, body = null) => {
  fetch(`${BACKEND_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((data) => {
      if (method === api.getData.method) {
        renderGallery(data);
      } else {
        showDataSuccess();
      }
    })
    .catch(() => {
      showDataError(errorElement);
      throw new Error(errorText);
    });
};

const getData = () => sendRequest(api.getData);
const sendData = (body) => sendRequest(api.sendData, body);

export { getData, sendData };
