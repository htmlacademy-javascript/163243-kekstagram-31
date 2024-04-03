const sliderElement = document.querySelector('.effect-level__slider');
const sliderValueElement = document.querySelector('.effect-level__value');
const imagePreviewElement = document.querySelector('.img-upload__preview');
const effectsListElement = document.querySelector('.effects__list');
const effectBarElement = document.querySelector('.img-upload__effect-level');

const defaultSliderSettings = { range: { min: 0, max: 1 }, start: 1, step: 0.01, connect: 'lower' };

const EffectsSettings = {
  chrome: {filter: 'grayscale', range: { min: 0, max: 1 }, start: 1, step: 0.01, unit: '' },
  sepia:  {filter: 'sepia', range: { min: 0, max: 1 }, start: 1, step: 0.01, unit: '' },
  marvin: {filter: 'invert', range: { min: 0, max: 1 }, start: 1, step: 0.01,unit: '' },
  phobos: {filter: 'blur', range: { min: 0, max: 3 }, start: 3, step: 0.01, unit: 'px' },
  heat:   {filter: 'brightness', range: { min: 1, max: 3 }, start: 3, step: 0.01, unit: '' },
};

/**
 * Иницилиазация слайдера
 */
const initSlider = () => {
  const { range, start, step, connect} = defaultSliderSettings;
  noUiSlider.create(sliderElement, { range, start, step, connect,
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
  const { range, start, step, filter, unit } = EffectsSettings[selectedEffect];
  effectBarElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({ range, start, step });
  sliderElement.noUiSlider.on('update', () => {
    imagePreviewElement.style.filter = `${ filter }(${ sliderValueElement.value }${ unit })`;
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

export { handleEffects, resetEffects };
