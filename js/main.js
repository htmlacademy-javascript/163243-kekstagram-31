import { generatePhotos } from './mocks/data.js';
import { renderThumbs } from './create-thumbs.js';

const IMAGES_COUNT = 25;

renderThumbs(generatePhotos(IMAGES_COUNT));
