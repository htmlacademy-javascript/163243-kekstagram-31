import { generatePhotos } from './mocks/data.js';
import { renderGallery } from './gallery.js';

const IMAGES_COUNT = 25;
const mockPhotoCards = generatePhotos(IMAGES_COUNT);


renderGallery(mockPhotoCards);
