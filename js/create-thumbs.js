import { generatePhotos } from '../js/mocks/data.js';

const IMAGES_COUNT = 25;
const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imageContainer = document.querySelector('.pictures');

// Удаляем скрытый класс
imageContainer.querySelector('.pictures__title').classList.remove('visually-hidden');

const images = generatePhotos(IMAGES_COUNT);
const imagesFragment = document.createDocumentFragment();

images.forEach(({id, url, description, likes, comments}) => {
  const photoCard = imageTemplate.cloneNode(true);
  photoCard.querySelector('.picture__img')['src'] = url;
  photoCard.querySelector('.picture__img')['alt'] = description;
  photoCard.querySelector('.picture__likes') = likes;
  photoCard.querySelector('.picture__comments') = comments.length;
  imagesFragment.appendChild(photoCard);
});

imageContainer.appendChild(photoCard);
