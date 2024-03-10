/**
 * Функция для отрисовки превью картинок
 * @param {array} images - принимает на вход сгенерированные (или полученные от сервера) картинки в виде массива объектов
 */
const createThumbs = (images) => {
  const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const imageContainer = document.querySelector('.pictures');
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
};

export { createThumbs };
