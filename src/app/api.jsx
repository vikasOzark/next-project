import { useQuery } from "react-query";

/**
 * This custom hook is used verify the users has the valid plan or not.
 * @param {string} tokens userId at the first and companyId at the second.
 * @returns
 */
export const useGetUserVerify = (token) => {
  return useQuery(
    ["verify", token],
    async (userData) => {
      const [_, tokens] = userData.queryKey;
      const [comapanyId, userId] = tokens.split("_");

      return fetch(`/api/users/verify_paln`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comapanyId, userId }),
      }).then((res) => res.json());
    },
    { retry: 0 }
  );
};
