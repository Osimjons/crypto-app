import { CRYPTO_ASSETS, CRYPTO_DATA } from '../Data/DATA';

export const fakeFetchCriptoData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(CRYPTO_DATA);
    }, 150);
  });
};
export const fakeFetchCriptoAssets = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(CRYPTO_ASSETS);
    }, 150);
  });
};
