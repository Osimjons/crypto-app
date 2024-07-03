import { CRYPTO_ASSETS } from '../Data/DATA';
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fakeFetchCriptoData = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': API_KEY,
    },
  };

  try {
    const resp = await fetch(BASE_URL, options);
    const data = await resp.json();
    console.log('data: ', data);

    return data;
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return null;
  }
};

export const fakeFetchCriptoAssets = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(CRYPTO_ASSETS);
    }, 150);
  });
};
