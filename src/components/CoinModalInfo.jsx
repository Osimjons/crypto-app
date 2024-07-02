import { Divider, Flex, Tag, Typography } from 'antd';

export const CoinModalInfo = ({ coin }) => {
  return (
    <>
      <Flex align="center" gap={15}>
        <img src={coin.icon} alt={coin.name} style={{ width: 40 }} />
        <Typography.Title level={2} style={{ marginBottom: 0 }}>
          ({coin.symbol}) {coin.name}
        </Typography.Title>
      </Flex>
      <Divider />
      <Typography.Paragraph style={{ display: 'flex', gap: 15 }}>
        <Typography.Text strong>
          1 hour:
          <Tag
            style={{ marginLeft: 5 }}
            color={coin.priceChange1h > 0 ? 'green' : 'red'}
          >
            {coin.priceChange1h}%
          </Tag>
        </Typography.Text>

        <Typography.Text strong>
          1 day:
          <Tag
            style={{ marginLeft: 5 }}
            color={coin.priceChange1d > 0 ? 'green' : 'red'}
          >
            {coin.priceChange1d}%
          </Tag>
        </Typography.Text>

        <Typography.Text strong>
          1 week:
          <Tag
            style={{ marginLeft: 5 }}
            color={coin.priceChange1w > 0 ? 'green' : 'red'}
          >
            {coin.priceChange1w}%
          </Tag>
        </Typography.Text>
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong>
          Price: {coin.price.toFixed(2)}$
        </Typography.Text>
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong>PriceBTC: {coin.priceBtc}$</Typography.Text>
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong>
          Market Capitalization: {coin.marketCap.toFixed(2)}$
        </Typography.Text>
      </Typography.Paragraph>
    </>
  );
};
