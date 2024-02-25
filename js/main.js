const IMAGES_COUNT = 25;
const LIKES_COUNT_MIN = 15;
const LIKES_COUNT_MAX = 200;
const COMMENTS_COUNT_MIN = 0;
const COMMENTS_COUNT_MAX = 30;
const AVATAR_ID_MIN = 1;
const AVATAR_ID_MAX = 6;
const COMMENT_TEXT_FISH = `Всё отлично!
В целом всё неплохо. Но не всё.
Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`;
const DESCRIPTION_TEXT_FISH = `Я не хочу сказать, что именно так и в полном объеме надо разрабатывать этот сайт.
Это решать заказчику.
Он сам может определить экономическую целесообразность или нецелесообразность инвестировать в такой проект.
Я лишь хотел на реальном кейсе показать, что ответить сходу на вопрос «сколько будет стоить стандартный сайт» невозможно.
Точнее если вы услышите цифру, скорее всего она будет ничем не обоснована.`;
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
 * @returns {integer} - возвращает новый идентификатор.
 */
const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId ++;
    return lastGeneratedId;
  };
};

// счетчики для ID фото и комментариев
const currentId = createIdGenerator();
const currentCommentId = createIdGenerator();

/**
 * Создание комментария к фото
 * @returns {obj} - возвращает объект комментария.
 */
const createComment = () =>
  ({
    id: currentCommentId(),
    avatar: `img/avatar-${getRandomInteger(AVATAR_ID_MIN, AVATAR_ID_MAX)}.svg`,
    message: `${getRandomText(COMMENT_TEXT_FISH)}`,
    name: `${getRandomArrayElement(NAMES)}`,
  });

/**
 * Создание карточки фотографии
 * @returns {obj} - возвращает объект карточки.
 */
const createPhotoCard = () =>
  // const currentId = createIdGenerator();
  ({
    id: currentId(),
    url: `photos/${currentId()}.jpg`,
    description: `${getRandomText(DESCRIPTION_TEXT_FISH)}`,
    likes: getRandomInteger(LIKES_COUNT_MIN, LIKES_COUNT_MAX),
    comments: Array.from({length: getRandomInteger(COMMENTS_COUNT_MIN, COMMENTS_COUNT_MAX)}, createComment),
  });

const generatedPhotos = Array.from({length: IMAGES_COUNT}, createPhotoCard);

console.log(generatedPhotos[2]);
