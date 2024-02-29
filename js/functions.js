/**
 * Функция, которая находит часы во входной строке
 * @param {string} timeString - время в виде строки;
 * @returns {integer} - часы в виде целого числа.
 */
const getHours = (timeString) => parseInt(timeString.split(':')[0], 10);

/**
 * Функция, которая находит минуты во входной строке
 * @param {*} timeString - время в виде строки;
 * @returns {integer} - минуты в виде целого числа.
 */
const getMinutes = (timeString) => parseInt(timeString.split(':')[1], 10);

/**
 * Функция, котороая определяет, поместится ли очередной встречи в календарь
 * @param {string} workTimeStart - время начала рабочего дня;
 * @param {string} workTimeEnd - время окончания рабочего дня;
 * @param {string} meetingStart - время начала встречи;
 * @param {integer} meetingDuration - продолжительность встречи;
 * @returns {boolean} - поместится ли встреча.
 */
const isMeetingFit = (workTimeStart, workTimeEnd, meetingStart, meetingDuration) => {
  if (getHours(meetingStart) < getHours (workTimeStart) || getHours(meetingStart) > getHours (workTimeEnd)) {return false;}
  const minutesLeft = (getHours(workTimeEnd) - getHours(meetingStart)) * 60 + getMinutes(workTimeEnd) - getMinutes(meetingStart);
  if (minutesLeft >= meetingDuration) {return true;}
  return false;

};

isMeetingFit('08:00', '17:30', '14:00', 90); // true
isMeetingFit('8:0', '10:0', '8:0', 120); // true
isMeetingFit('08:00', '14:30', '14:00', 90); // false
isMeetingFit('14:00', '17:30', '08:0', 90); // false
isMeetingFit('8:00', '17:30', '08:00', 900); // false
