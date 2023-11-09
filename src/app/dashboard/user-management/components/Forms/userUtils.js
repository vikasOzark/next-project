import formValidator from "@/utils/formValidator";
import axios from "axios";

export const createUserMutation = (event, data, setFormError) => {
      event.preventDefault();
      console.log(event.target);
    
      const ticketData = {
        first_name: event.target.first_name.value,
        last_name: event.target.last_name.value,
        contact_number : event.target.contact_number.value,
        email : event.target.email.value,
        password : event.target.confirm_password.value,
...data
      };
      console.log(ticketData);
      // const isError = formValidator(ticketData);
      // if (isError) {
      //   setFormError(isError);
      //   throw new Error();
      // }

      return axios.post(`/api/users`, ticketData);
    }