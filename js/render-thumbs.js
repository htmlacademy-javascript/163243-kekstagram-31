const RANDOM_CARD_LIMIT = 10;

import { getRandomInteger } from './util.js';

const compareCommentsCount = (cardA, cardB) => cardB.comments.length - cardA.comments.length;

const getRandomCards = (cards) => {
  const randomCards = [];
  const usedIndexes = [];
  let currentLength = 0;
  while (currentLength < RANDOM_CARD_LIMIT) {
    const tryThisIndex = getRandomInteger(0, cards.length - 1);
    if (usedIndexes.includes(tryThisIndex)) {
      continue;
    } else {
      randomCards.push(cards[tryThisIndex]);
      usedIndexes.push(tryThisIndex);
      currentLength++;
    }
  }
  return randomCards;
};

const filters = {
  default:  (cards) => cards,
  random: (cards) => getRandomCards(cards),
  discussed: (cards) => cards.sort(compareCommentsCount),
};

/**
 * Функция для отрисовки превью картинок
 * @param {array} images - принимает на вход сгенерированные (или полученные от сервера) картинки в виде массива объектов
 */
const renderThumbs = (images, filter) => {
  const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const imageContainer = document.querySelector('.pictures');
  const imagesFragment = document.createDocumentFragment();
  const imagesElements = imageContainer.querySelectorAll('.picture');

  const filteredImages = filters[filter](images);

  filteredImages.forEach(({url, description, likes, comments, id}) => {
    const photoCard = imageTemplate.cloneNode(true);
    const imageElement = photoCard.querySelector('.picture__img');
    imageElement.src = url;
    imageElement.alt = description;
    imageElement.dataset.id = id;
    photoCard.querySelector('.picture__likes').textContent = likes;
    photoCard.querySelector('.picture__comments').textContent = comments.length;
    imagesFragment.appendChild(photoCard);
  });

  imagesElements.forEach((elem) => elem.parentElement.removeChild(elem));
  imageContainer.appendChild(imagesFragment);
  return imageContainer;
};

export { renderThumbs };
