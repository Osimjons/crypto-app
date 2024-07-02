import { createContext, useEffect, useState } from 'react';
import { fakeFetchCriptoAssets, fakeFetchCriptoData } from '../API/fakeFetch';
import { persetDifference } from '../helpers/persetDifference';

export const CryptoContext = createContext({
  crypto: [],
  assets: [],
  loading: false,
  addAsset: () => {},
});

export const CryptoContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id); //Ищем в приходящем массиве нашу монету
      const icon = coin.icon;
      return {
        /**`Был ли рост Сpанивает был ли рост рыночной цены относительно той цены по короторой мы покупали монету` */
        grow: asset.price <= coin.price,

        /** `Рост в % ` */
        growPercent: persetDifference(asset.price, coin.price),

        /**`сколько имеем крипты относительно рыночной цены` */
        totalAmount: asset.amount * coin.price,

        /**`Общая прибыль` */
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,

        /**`Общее вложение в деньгах` */
        totalInvestment: asset.amount * asset.price,
        name: coin.name,
        icon,
        ...asset,
      };
    });
  }
  // function mapAssets(assets, result) {
  //   return assets.map((asset) => {
  //     const coin = result?.find((c) => c.id === asset.id);
  //     const icon = coin.icon;
  //     return {
  //       grow: asset.price <= coin.price,
  //       growPercent: persetDifference(asset.price, coin.price),
  //       totalAmount: asset.amount * coin.price,
  //       totalProfit: asset.amount * coin.price - asset.amount * asset.price,
  //       icon,
  //       ...asset,
  //     };
  //   });
  // }

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCriptoData();
      const assets = await fakeFetchCriptoAssets();

      setAssets(mapAssets(assets, result));

      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);

  function addAsset(newAsset) {
    console.log('newAsset: ', newAsset);
    // debugger
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
};
