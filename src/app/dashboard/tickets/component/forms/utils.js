/**
 * This util function is used fetch the tags list from the DB and sets the
 * Tag list in tags state
 * @param { Function } setTags accepts the function of useState's set function
 */
export const getTagsList = async (config) => {
  const { setTags = null } = config;

  const response = await fetch("/api/tags");
  const json_response = await response.json();

  if (json_response?.success) {
    const formatted = json_response.data?.map((item) => ({
      name: item.title,
      id: item.id,
      color: item.color,
      isSelected: false,
    }));

    if (setTags) {
      setTags(formatted);
    }
  }

  return json_response;
};

/**
 * This function is used to get the department list from the DB
 * @returns Returns list promise os department data
 */
export const getDepartmentData = async () => {
  const response = await fetch("/api/departments");
  const json_response = await response.json();
  return json_response;
};


export const appendTicketCall = async (e) => {
  e.preventDefault();

  const response = await fetch(
    `/api/tickets/merge/${ticketData.id}/append`,
    {
      method: "PATCH",
      body: JSON.stringify({ ticketsIds: selectedIds }),
    }
  );
  const jsonResponse = await response.json();
  return jsonResponse;
}