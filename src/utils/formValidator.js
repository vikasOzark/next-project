/**
 * This Utility function is used to validate the Object data if field is empty it returns the object of message
 * @param {Object} formData Accepts a object to valdiate the data
 * @param {Array} ignoreFields Optional accepts a Array of keys with needs to be ingore by the validator
 * @returns Returns the object if any field validated the error else returns `false`.
 */
const formValidator = (formData, ignoreFields = []) => {
  const error = {};
  Object.entries(formData).forEach(([key, value]) => {
    if (!ignoreFields.includes(key)) {
      if (value === "") {
        
        error[key] = `${key.split("_").join(" ")} field is required`;
      }
    }
  });

  if (Object.keys(error).length) {
    return error;
  } else {
    return false
  }
};

export default formValidator;
