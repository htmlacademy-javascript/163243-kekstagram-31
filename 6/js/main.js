import { generatePhotos } from '../js/mocks/data.js';
import { createThumbs } from './create-thumbs.js';

const IMAGES_COUNT = 25;

createThumbs(generatePhotos(IMAGES_COUNT));
