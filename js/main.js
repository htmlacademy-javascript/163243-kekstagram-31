// import { generatePhotos } from './mocks/data.js';
// import { renderGallery } from './gallery.js';
import { handleImageUpload } from './upload-image.js';
import { getData } from './api.js';

// const IMAGES_COUNT = 25;
// const mockPhotoCards = generatePhotos(IMAGES_COUNT);

// const downloadedData = downloadData();
// renderGallery(mockPhotoCards);
getData();
handleImageUpload();

