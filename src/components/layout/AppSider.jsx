import { Card, Layout, List, Statistic, Tag, Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import style from './AppSider.module.css';
import { useContext } from 'react';
import { capitalaze } from '../../helpers/Capitalaze';
import { CryptoContext } from '../../context/CoinContext';

export const AppSider = () => {
  const { assets } = useContext(CryptoContext);

  return (
    <Layout.Sider width="25%" style={{ padding: '1rem' }}>
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
              // { title: 'Difference', value: asset.growPercent },
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
