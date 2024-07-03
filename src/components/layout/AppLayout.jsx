import { Layout, Spin } from 'antd';
import { AppHeader } from './AppHeader';
import { AppSider } from './AppSider';
import { AppContent } from './AppContent';
import { useContext } from 'react';
import { CryptoContext } from '../../context/CoinContext';
import { useWindowWidth } from '../../Hooks/useWindowWidth';

export const AppLayout = () => {
  const { loading } = useContext(CryptoContext);
  const [windowWidth] = useWindowWidth();

  if (loading) {
    return <Spin fullscreen />;
  }
  return (
    <Layout>
      <AppHeader />
      <Layout>
        {windowWidth > 980 && <AppSider />}
        <AppContent />
      </Layout>
    </Layout>
  );
};
