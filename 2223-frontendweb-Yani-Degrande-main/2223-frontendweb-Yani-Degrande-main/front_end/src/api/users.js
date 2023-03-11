// ========== Users API ==========
// This file contains the API calls for the users

// === Imports ===

// - import auth0
import { useAuth0 } from "@auth0/auth0-react";
//import axios
import axios from "axios";

// - import react
import { useCallback } from "react";

// === Constants ===
const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

// === Functions ===
const useUsers = () => {
  // - token for auth0
  const { getAccessTokenSilently } = useAuth0();

  // - get all users
  const getAll = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const { data } = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.items;
  }, [getAccessTokenSilently]);

  // - get user by auth0 id
  const getByAuth0Id = useCallback(
    async (auth0Id) => {
      const token = await getAccessTokenSilently();
      const { data } = await axios.get(`${baseUrl}/${auth0Id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },
    [getAccessTokenSilently]
  );

  // - get count of users
  const getCount = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const { data } = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.count;
  }, [getAccessTokenSilently]);

  // - return
  return { getAll, getCount, getByAuth0Id };
};

// === Exports ===
export default useUsers;
