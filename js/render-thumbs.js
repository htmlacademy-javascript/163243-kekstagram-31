/**
 * Функция для отрисовки превью картинок
 * @param {array} images - принимает на вход сгенерированные (или полученные от сервера) картинки в виде массива объектов
 */
const renderThumbs = (images) => {
  const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const imageContainer = document.querySelector('.pictures');
  const imagesFragment = document.createDocumentFragment();
  const imagesComments = {};

  images.forEach(({url, description, likes, comments, id}) => {
    const photoCard = imageTemplate.cloneNode(true);
    const imageElement = photoCard.querySelector('.picture__img');
    imageElement.src = url;
    imageElement.alt = description;
    imageElement.setAttribute('data-id', id);
    photoCard.querySelector('.picture__likes').textContent = likes;
    photoCard.querySelector('.picture__comments').textContent = comments.length;
    imagesFragment.appendChild(photoCard);
    imagesComments[id] = comments;
  });

  imageContainer.appendChild(imagesFragment);
  return [imageContainer, imagesComments];
};

export { renderThumbs };
