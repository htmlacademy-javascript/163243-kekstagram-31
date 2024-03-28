import { generatePhotos } from './mocks/data.js';
import { renderGallery } from './gallery.js';
import { handleImageUpload } from './upload-image.js';

const IMAGES_COUNT = 25;
const mockPhotoCards = generatePhotos(IMAGES_COUNT);

renderGallery(mockPhotoCards);
handleImageUpload();

