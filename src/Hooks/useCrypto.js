import { useContext } from 'react';
import { CryptoContext } from '../context/CoinContext';

export function useCrypto() {
  return useContext(CryptoContext);
}
