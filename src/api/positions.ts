import axios from 'axios';

const API_URL = "https://frontend-test-assignment-api.abz.agency/api/v1";

export type Position = {
  id: number;
  name: string;
};

export const getPositions = async (): Promise<Position[]> => {
  const res = await axios.get(`${API_URL}/positions`);
  return res.data.positions;
};