const { default: axios } = require("axios");
const { useMutation } = require("react-query");

const useAddNote = (event) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (event) => {
      event.preventDefault();

      toast.loading("Adding note...");

      const data = event.target.note.value;
      if (data === "") {
        throw new Error("Please enter a note.");
      }

      return axios.post(`/api/tickets/${id}/notes`, { note: data });
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Note added successfully");
      queryClient.invalidateQueries(id);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error("Couldn't added note !");
    },
  });
};
