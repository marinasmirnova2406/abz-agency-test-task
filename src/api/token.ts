import axios from "axios";

const API_URL = "https://frontend-test-assignment-api.abz.agency/api/v1";

export const getToken = async (): Promise<string> => {
  const res = await axios.get(`${API_URL}/token`);
  return res.data.token;
};