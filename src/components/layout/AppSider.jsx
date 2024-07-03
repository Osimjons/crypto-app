import { Card, Layout, List, Statistic, Tag, Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import style from './AppSider.module.css';
import { useContext } from 'react';
import { capitalaze } from '../../helpers/Capitalaze';
import { CryptoContext } from '../../context/CoinContext';
import { useWindowWidth } from '../../Hooks/useWindowWidth';

export const AppSider = () => {
  const { assets } = useContext(CryptoContext);
  const [windowWidth] = useWindowWidth();

  const siderWidth = windowWidth < 980 ? '70%' : '30%';
  const siderStyle =
    windowWidth < 980
      ? { padding: '1rem', alignSelf: 'center' }
      : { padding: '1rem' };

  return (
    <Layout.Sider width={siderWidth} style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} className={style.card}>
          <Statistic
            title={capitalaze(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              {
                title: 'Total Profit',
                value: asset.totalProfit,
                withTag: true,
              },
              {
                title: 'Asset Amount',
                value: asset.amount,
                flag: true,
                icon: asset.icon,
              },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag && (
                    <Tag color={asset.grow ? 'green' : 'red'}>
                      {asset.growPercent}%
                    </Tag>
                  )}
                  {item.flag && (
                    <span
                      style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                    >
                      {item.value}
                      <img src={item.icon} width="20px" alt="Coin Icon" />
                    </span>
                  )}

                  {!item.flag && (
                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
};
