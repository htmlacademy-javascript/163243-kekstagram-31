/**
 * Функция для отрисовки превью картинок
 * @param {array} images - принимает на вход сгенерированные (или полученные от сервера) картинки в виде массива объектов
 */
const renderThumbs = (images) => {
  const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const imageContainer = document.querySelector('.pictures');
  const imagesFragment = document.createDocumentFragment();

  images.forEach(({url, description, likes, comments}) => {
    const photoCard = imageTemplate.cloneNode(true);
    const imageEl = photoCard.querySelector('.picture__img');
    imageEl.src = url;
    imageEl.alt = description;
    photoCard.querySelector('.picture__likes').textContent = likes;
    photoCard.querySelector('.picture__comments').textContent = comments.length;
    imagesFragment.appendChild(photoCard);
  });

  imageContainer.appendChild(imagesFragment);
};

export { renderThumbs };
