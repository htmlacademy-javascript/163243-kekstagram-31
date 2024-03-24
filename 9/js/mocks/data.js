import { getRandomInteger, getRandomArrayElement, getRandomText, createIdGenerator } from './util.js';

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

export { generatePhotos };

