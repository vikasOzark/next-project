import formValidator from "@/utils/formValidator";

export const createUserMutation = (event, selectedTag, setFormError) => {
      event.preventDefault();
      const ticketData = {
        taskTitle: event.target.taskTitle.value,
        ticketDetil: event.target.ticketDetil.value,
        department: event.target.department.value,
        tags: selectedTag,
      };

      const isError = formValidator(ticketData);
      if (isError) {
        setFormError(isError);
        throw new Error();
      }

      return axios.post(`/api/tickets`, ticketData);
    }