import formValidator from "@/utils/formValidator";
import axios from "axios";

export const createUserMutation = (event, data, setFormError) => {
  event.preventDefault();
   

  const ticketData = {
    first_name: event.target.first_name.value,
    last_name: event.target.last_name.value,
    contact_number: event.target.contact_number.value,
    email: event.target.email.value,
    password: event.target.confirm_password.value,
    ...data,
  };
   
  // const isError = formValidator(ticketData);
  // if (isError) {
  //   setFormError(isError);
  //   throw new Error();
  // }

  return axios.post(`/api/users`, ticketData);
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
