import {
  Divider,
  Flex,
  Select,
  Space,
  Typography,
  Form,
  Button,
  InputNumber,
  DatePicker,
  Result,
} from 'antd';
import { useRef, useState } from 'react';
import { useCrypto } from '../Hooks/useCrypto';

export const AddAssetForm = ({ onclose }) => {
  const [form] = Form.useForm();
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [submited, setSubmited] = useState(false);
  const assetRef = useRef();
  const validateMessege = {
    required: '${label} is required',
    types: {
      number: '${label} in not a vdlid number',
    },
    number: {
      range: '${label} must be beetwen ${min} and ${max}',
    },
  };

  if (!coin) {
    return (
      <Select
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Select Coin"
        style={{ width: '100%', textAlign: 'center' }}
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
    );
  }

  if (submited) {
    return (
      <Result
        status="success"
        title="New Asset Added "
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onclose}>
            Close
          </Button>,
        ]}
      />
    );
  }
  function onFinish(val) {
    const newAsset = {
      id: coin.id,
      amount: val.Amount,
      price: val.price,
      date: val.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    setSubmited(true);
    addAsset(newAsset);
  }

  function handleAmoutChenge(val) {
    form.setFieldsValue({
      totalPrise: Number(val * coin.price).toFixed(2) + '$',
    });
  }

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 10,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          price: Number(coin.price.toFixed(2)),
        }}
        onFinish={onFinish}
        validateMessages={validateMessege}
      >
        <Flex align="center" gap={15}>
          <img src={coin.icon} alt={coin.name} style={{ width: 40 }} />
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            {coin.name}
          </Typography.Title>
        </Flex>
        <Divider />

        <Form.Item
          label="Amount"
          name="Amount"
          rules={[
            {
              type: 'number',
              min: 0,
              required: true,
            },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="Enter coin Amount"
            onChange={handleAmoutChenge}
          />
        </Form.Item>

        <Form.Item label="Price" name="price">
          <InputNumber disabled style={{ width: '100%', color: '#000' }} />
        </Form.Item>

        <Form.Item label="Date & Time" name="date">
          <DatePicker showTime style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Total" name="totalPrise">
          <InputNumber disabled style={{ width: '100%', color: '#000' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Asset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
