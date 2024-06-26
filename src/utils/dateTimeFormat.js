import { VscCircleSmallFilled } from "react-icons/vsc";


/**
 * This helper function is used format date time, `isFormated=true` date time will be return in formate way
 * `isFormated=false` date time will be return in object format, later you can pass required format such as { onlyTime | onlyDate | dateTime }.
 * 
 * @param {String}
 * @param {DateTime} dateTime 
 * @param {Config} config 
 * @returns 
 */
const handleTimeFormat = (dateTimeString, config) => {
  if (dateTimeString) {
    const {
      isFormated = false,
      datePrifix = "/",
      onlyTime = false,
      onlyDate = false,
      dateTime = false,
    } = config;

    const dateObject = new Date(dateTimeString);
    const dateYear = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();

    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    const COMBINED_DATE = `${day}${datePrifix}${month}${datePrifix}${dateYear}`;
    const COMBINED_TIME = `${hours}:${minutes}`;

    if (isFormated) {
      if (onlyTime) {
        return COMBINED_TIME;
      }
      if (onlyDate) {
        return COMBINED_DATE;
      }
      if (dateTime) {
        return <><span className="flex items-center">{COMBINED_DATE}<VscCircleSmallFilled size={18} /> {COMBINED_TIME}</span></>;
      }
      return {
        date: COMBINED_DATE,
        time: COMBINED_TIME,
      };
    }
    return { dateYear, month, day, hours, minutes };
  }
  return null;
};

export default handleTimeFormat;

export const isLatestTicket = (createdAt) => {
  const creationDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDifference = currentDate - creationDate;

  return timeDifference < 86_400_000;
};
