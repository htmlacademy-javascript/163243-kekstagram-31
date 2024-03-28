const sliderElement = document.querySelector('.effect-level__slider');
const sliderValueElement = document.querySelector('.effect-level__value');
const imagePreviewElement = document.querySelector('.img-upload__preview');
const effectsListElement = document.querySelector('.effects__list');
const effectBarElement = document.querySelector('.img-upload__effect-level');

const DefaultSliderSettings = {MIN: 0, MAX: 1, START: 1, STEP: 0.01, CONNECT: 'lower',};

const EffectsSettings = {
  chrome: {filter: 'grayscale', min: 0, max: 1, start: 1, step: 0.01, unit: '',},
  sepia:  {filter: 'sepia', min: 0, max: 1, start: 1, step: 0.01, unit: '',},
  marvin: {filter: 'invert', min: 0, max: 1, start: 1, step: 0.01,unit: '%',},
  phobos: {filter: 'blur', min: 0, max: 3, start: 3, step: 0.01, unit: 'px',},
  heat:   {filter: 'brightness', min: 1, max: 3, start: 3, step: 0.01, unit: '',},
};

/**
 * Иницилиазация слайдера
 */
const initSlider = () => {
  const {MIN, MAX, START, STEP, CONNECT} = DefaultSliderSettings;
  noUiSlider.create(sliderElement, {
    range: {min: MIN, max: MAX }, start: START, step: STEP, connect: CONNECT,
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  sliderElement.noUiSlider.on('update', () => {
    sliderValueElement.value = sliderElement.noUiSlider.get();
  });
};

/**
 * Очистка эффектов
 */
const resetEffects = () => {
  effectBarElement.classList.add('hidden');
  imagePreviewElement.removeAttribute('style');
};

/**
 * Применение выбранного эффекта
 * @param {string} selectedEffect - строковое значение выбранного эффекта
 */
const setEffect = (selectedEffect) => {
  const {min, max, start, step, filter, unit} = EffectsSettings[selectedEffect];
  effectBarElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({range: { min, max }, start, step,});
  sliderElement.noUiSlider.on('update', () => {
    imagePreviewElement.style.filter = `${filter}(${sliderValueElement.value}${unit})`;
  });
};

/**
 * Обработчик нажатия на эффект
 * @param {evt} evt - событие
 */
const effectClickHandler = (evt) => {
  if (evt.target.value === 'none') {
    resetEffects();
    return;
  }
  setEffect(evt.target.value);
};

/**
 * Функция - интерфейс модуля эффектов
 */
const handleEffects = () => {
  resetEffects();
  initSlider();
  effectsListElement.addEventListener('change', effectClickHandler);
};

export { handleEffects };
