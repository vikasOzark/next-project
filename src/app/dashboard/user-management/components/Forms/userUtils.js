import axios from "axios";

export const createUserMutation = (event, data, setFormError) => {
  event.preventDefault();
  setFormError({});

  const userPayload = {
    first_name: event.target.first_name.value,
    last_name: event.target.last_name.value,
    contact_number: event.target.contact_number.value,
    email: event.target.email.value,
    password: event.target.confirm_password.value,
    ...data,
  };

  const isError = formValidator(userPayload);
  if (isError) {
    setFormError(isError);
    throw new Error("Please provide required user information.");
  }

  return axios.post(`/api/users`, userPayload);
};

export const getUsersData = async () => {
  const response = await fetch("/api/users");

  if (response.status === 500) {
    throw new Error("");
  }
  const json_response = await response.json();
  if (json_response.success) {
    return json_response;
  }
  throw new Error("");
};

export const getUsersDataNew = async () => {
  const response = await axios("/api/users");

  if (response.status === 500) {
    throw new Error("");
  }
  const json_response = await response.json();
  if (json_response.success) {
    return json_response;
  }
  throw new Error("");
};

const formValidator = (formData, ignoreFields = []) => {
  const error = {};
  Object.entries(formData).forEach(([key, value]) => {
    if (!ignoreFields.includes(key)) {
      if (value === "" || value === null) {
        error[key] = `${key.split("_").join(" ")} field is required.`;
      }
    }
  });

  if (Object.keys(error).length) {
    return error;
  } else {
    return false;
  }
};
