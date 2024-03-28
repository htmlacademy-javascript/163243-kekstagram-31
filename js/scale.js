const ScaleProperties = {MIN: 25, MAX: 100, STEP: 25};

const increaseScaleElement = document.querySelector('.scale__control--smaller');
const decreaseScaleElement = document.querySelector('.scale__control--bigger');
const scaleControlElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

/**
 * Обработчик клика по кнопкам изменения масштаба
 * @param {evt} evt - событие
 */
const scaleChangeClickHandler = (evt) => {
  let scaleValue = parseInt(scaleControlElement.value, 10);
  scaleValue += evt.target.className.includes('smaller') ? -ScaleProperties.STEP : ScaleProperties.STEP;
  if (scaleValue >= ScaleProperties.MIN && scaleValue <= ScaleProperties.MAX) {
    scaleControlElement.value = `${scaleValue}%`;
    imagePreviewElement.style.transform = `scale(${scaleValue / ScaleProperties.MAX})`;
  }
};

/**
 * Функция - интерфейс модуля управления масштабом картинки
 */
const handleScale = () => {
  decreaseScaleElement.addEventListener('click', scaleChangeClickHandler);
  increaseScaleElement.addEventListener('click', scaleChangeClickHandler);
};

export { handleScale };
