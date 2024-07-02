import { Button, Drawer, Layout, Modal, Select, Space } from 'antd';
import { useCrypto } from '../../Hooks/useCrypto';
import { useEffect, useState } from 'react';
import { CoinModalInfo } from '../CoinModalInfo';
import { AddAssetForm } from '../AddAssetForm';
const headerStyle = {
  color: '#fff',
  height: 65,
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export const AppHeader = () => {
  const { crypto } = useCrypto();
  const [select, setSelect] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coin, setCoin] = useState(null);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const keypress = (e) => {
      if (e.key === '/') {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener('keypress', keypress);

    return () => document.removeEventListener('keypress', keypress);
  }, []);
  const handleSelect = (val) => {
    setCoin(crypto.find((c) => c.id === val));
    setIsModalOpen(true);
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        open={select}
        onClick={() => setSelect((prev) => !prev)}
        onSelect={handleSelect}
        value="Click here or press '/' to open"
        style={{ width: '250px', textAlign: 'center' }}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add asset
      </Button>

      <Drawer
        title="Add Asset"
        width={600}
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onclose={() => setDrawer(false)} />
      </Drawer>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <CoinModalInfo coin={coin} />
      </Modal>
    </Layout.Header>
  );
};
