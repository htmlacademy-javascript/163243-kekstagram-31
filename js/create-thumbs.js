import { generatePhotos } from '../js/mocks/data.js';

const IMAGES_COUNT = 25;
const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imageContainer = document.querySelector('.pictures');

// Удаляем скрытый класс - оказалось тайтл здесь не нужен)
// imageContainer.querySelector('.pictures__title').classList.remove('visually-hidden');

const images = generatePhotos(IMAGES_COUNT);
const imagesFragment = document.createDocumentFragment();

images.forEach(({_, url, description, likes, comments}) => {
  const photoCard = imageTemplate.cloneNode(true);
  photoCard.querySelector('.picture__img')['src'] = url;
  photoCard.querySelector('.picture__img')['alt'] = description;
  photoCard.querySelector('.picture__likes').textContent = likes;
  photoCard.querySelector('.picture__comments').textContent = comments.length;
  imagesFragment.appendChild(photoCard);
});

imageContainer.appendChild(imagesFragment);
