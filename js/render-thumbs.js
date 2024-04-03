
const compareComments = (cardA, cardB) => cardB.comments.length - cardA.comments.length;

const filters = {
  default:  (cards) => cards,
  random: (cards) => cards,
  discussed: (cards) => cards.sort(compareComments),
};

/**
 * Функция для отрисовки превью картинок
 * @param {array} images - принимает на вход сгенерированные (или полученные от сервера) картинки в виде массива объектов
 */
const renderThumbs = (images, filter) => {
  const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const imageContainer = document.querySelector('.pictures');
  const imagesFragment = document.createDocumentFragment();
  const imagesElements = imageContainer.querySelectorAll('.picture');


  const filteredImages = filters[filter](images);
  console.log(images);
  console.log(filteredImages);
//   var container = document.getElementById("container");
// var elements = container.getElementsByClassName("deleteme");


// imagesElements.forEach((elem) => {elem.innerHTML = ''};)
  filteredImages.forEach(({url, description, likes, comments, id}) => {
    const photoCard = imageTemplate.cloneNode(true);
    const imageElement = photoCard.querySelector('.picture__img');
    imageElement.src = url;
    imageElement.alt = description;
    imageElement.dataset.id = id;
    photoCard.querySelector('.picture__likes').textContent = likes;
    photoCard.querySelector('.picture__comments').textContent = comments.length;
    imagesFragment.appendChild(photoCard);
  });

  imagesElements.forEach((elem) => elem.parentElement.removeChild(elem));
  imageContainer.appendChild(imagesFragment);
  return imageContainer;
};

export { renderThumbs };
