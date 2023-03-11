// ========== Reservations API ==========
// This file contains the API calls for the Reservations

// === Imports ===

// - import auth0
import { useAuth0 } from "@auth0/auth0-react";
//import axios
import axios from "axios";

// - import react
import { useCallback } from "react";

// === Constants ===
const baseUrl = `${process.env.REACT_APP_API_URL}/reservations`;

// === Functions ===
const useReservations = () => {
  // - token for auth0
  const { getAccessTokenSilently } = useAuth0();

  // - get all reservations
  const getAll = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const { data } = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.items;
  }, [getAccessTokenSilently]);

  // - get count of reservations
  const getCount = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const { data } = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.count;
  }, [getAccessTokenSilently]);

  // - create reservation
  const create = useCallback(
    async (reservation) => {
      const token = await getAccessTokenSilently();

      const { data } = await axios.post(baseUrl, reservation, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    [getAccessTokenSilently]
  );

  // - return
  return { getAll, getCount, create };
};

// === Exports ===
export default useReservations;
