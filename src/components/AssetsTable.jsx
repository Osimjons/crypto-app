import { Table, Typography } from 'antd';
import { useCrypto } from '../Hooks/useCrypto';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    showSorterTooltip: {
      target: 'full-header',
    },
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
];
export const AssetsTable = () => {
  const { assets } = useCrypto();
  const data = assets.map((asset) => ({
    key: asset.id,
    name: asset.name,
    price: asset.price,
    amount: asset.amount,
  }));
  if (!assets) {
    return <Typography.Title level={2}>Add Asset</Typography.Title>;
  }
  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data}
      showSorterTooltip={{
        target: 'sorter-icon',
      }}
    />
  );
};
