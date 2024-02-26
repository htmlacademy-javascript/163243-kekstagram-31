const IMAGES_COUNT = 25;
const LikesCount = {
  MIN: 15,
  MAX: 200,
};
const CommentsCount = {
  MIN: 0,
  MAX: 30,
};
const AvatarId = {
  MIN: 1,
  MAX: 6,
};
const TextFish = {
  COMMENT: `Всё отлично!
  В целом всё неплохо. Но не всё.
  Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
  Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
  Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
  Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
  DESCRIPTION: `Я не хочу сказать, что именно так и в полном объеме надо разрабатывать этот сайт.
  Это решать заказчику.
  Он сам может определить экономическую целесообразность или нецелесообразность инвестировать в такой проект.
  Я лишь хотел на реальном кейсе показать, что ответить сходу на вопрос «сколько будет стоить стандартный сайт» невозможно.
  Точнее если вы услышите цифру, скорее всего она будет ничем не обоснована.`,
};
const NAMES = ['Артем', 'Вася', 'Глаша', 'Маша', 'Катя', 'Вика', 'Марина', 'Дима', 'Сережа', 'Саша', 'Иннокентий'];

/**
 * Функция для генерации рандомного целого числа из диапазона
 * @param {integer} a -  одна из границ диапазона
 * @param {integer} b - вторая граница диапазона
 * @returns {integer} - возвращает случайное число
 */
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * Функция для выбора рандомного элемента массива
 * @param {array} elements - исходный массив
 * @returns {*} возвращает рандомный элемент
 */
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

/**
 * Функция для генерации рандомного комментария/описания
 * @param {array} textArray - массив с текстом из которого выбираем предложения.
 * @returns {string} - возвращает строку из 1 или 2 предложений
 */
const getRandomText = (textArray) => Array.from({length: getRandomInteger(1,2)}, () => getRandomArrayElement(textArray.split('\n'))).join(' ');

/**
 * Функция для генератоции уникальных возрастающих ID
 * @returns {function} - возвращает функцию, которая генерирует новый идентификатор.
 */
const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => ++lastGeneratedId;
};

// Функция счетчика для IDкомментариев
const getCurrentCommentId = createIdGenerator();

/**
 * Создание комментария к фото
 * @returns {obj} - возвращает объект комментария.
 */
const createComment = () =>
  ({
    id: getCurrentCommentId(),
    avatar: `img/avatar-${getRandomInteger(AvatarId.MIN, AvatarId.MAX)}.svg`,
    message: `${getRandomText(TextFish.COMMENT)}`,
    name: `${getRandomArrayElement(NAMES)}`,
  });

// Функция счетчика для ID фото
const getCurrentId = createIdGenerator();

/**
 * Создание карточки фотографии
 * @returns {obj} - возвращает объект карточки фотографии.
 */
const createPhotoCard = () => {
  const photoId = getCurrentId();
  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: `${getRandomText(TextFish.COMMENT)}`,
    likes: getRandomInteger(LikesCount.MIN, LikesCount.MAX),
    comments: Array.from({length: getRandomInteger(CommentsCount.MIN, CommentsCount.MAX)}, createComment),
  };
};

/**
 * Функция по генерации нудного количества карточек фотографий
 * @param {integer} countPhotos - количество карточек для генерации
 * @returns {array} - возвращает массив объектов карточек фото.
 */
const generatePhotos = (countPhotos) => Array.from({length: countPhotos}, createPhotoCard);

const generatedPhotos = generatePhotos(IMAGES_COUNT);
// console.log(generatedPhotos[2]);
