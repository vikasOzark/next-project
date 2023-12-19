const handleTimeFormat = (datetime, config) => {
  if (datetime) {
    const {
      isFormated = false,
      datePrifix = "-",
      onlyTime = false,
      onlyDate = false,
      dateTime = false,
    } = config;

    const dateObject = new Date(datetime);
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
        return COMBINED_DATE + " | " + COMBINED_TIME;
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
  const creationDate = new Date(createdAt); // Replace 'creationDate' with the actual property name in your data
  const currentDate = new Date();
  const timeDifference = currentDate - creationDate;

  // Check if the data was created in the last 2 days (86400000 milliseconds in a day)
  const isNewData = timeDifference < 2 * 24 * 60 * 60 * 1000;

  return isNewData
}