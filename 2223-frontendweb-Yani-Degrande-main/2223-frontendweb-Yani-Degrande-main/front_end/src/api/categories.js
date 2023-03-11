// ========== Categories API ==========
// This file contains the API calls for the categories

// === Imports ===

// - import auth0
import { useAuth0 } from "@auth0/auth0-react";
//import axios
import axios from "axios";

// - import react
import { useCallback } from "react";

// === Constants ===
const baseUrl = `${process.env.REACT_APP_API_URL}/categories`;

// === Functions ===
const useCategories = () => {
  // - token for auth0
  const { getAccessTokenSilently } = useAuth0();

  // - get all categories
  const getAll = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const { data } = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.items;
  }, [getAccessTokenSilently]);

  // - delete category by name
  const deleteByName = useCallback(
    async (name) => {
      const token = await getAccessTokenSilently();
      await axios.delete(`${baseUrl}/${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [getAccessTokenSilently]
  );

  // - get category by name
  const getByName = useCallback(
    async (name) => {
      const token = await getAccessTokenSilently();
      const { data } = await axios.get(`${baseUrl}/${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    [getAccessTokenSilently]
  );

  // - save category
  const save = useCallback(
    async (category) => {
      const token = await getAccessTokenSilently();
      const { id, ...values } = category;
      await axios({
        method: id ? "PUT" : "POST",
        url: `${baseUrl}/${id ?? ""}`,
        data: values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [getAccessTokenSilently]
  );

  // - return
  return { getAll, deleteByName, getByName, save };
};

// === Exports ===
export default useCategories;
