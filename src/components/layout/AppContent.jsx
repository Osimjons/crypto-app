import { Layout, Typography } from 'antd';
import { useCrypto } from '../../Hooks/useCrypto';
import { AssetsTable } from '../AssetsTable';
import { PortfolioChart } from '../PortfolioChart';
// import style from '../layout/Appcontent.module.css';
import style from './AppContent.module.css';
const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 65px)',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
};

export const AppContent = () => {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});
  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
        Portfolio:{' '}
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, v) => (acc += v), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <div className={style.childeWrap}>
        <PortfolioChart />
        <AssetsTable />
      </div>
    </Layout.Content>
  );
};
