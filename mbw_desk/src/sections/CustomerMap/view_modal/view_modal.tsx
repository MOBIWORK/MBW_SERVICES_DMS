import { useEffect, useRef, useState } from "react";
import { AxiosService } from "../../services/server";
import { Modal,Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import  {ScopeAnalysis} from './scope_analysis';
import  { ReactNode } from "react";
type Props = {
  open: string | ReactNode;
  title: string;
  onCancel : ReactNode;
  onOk: ReactNode;
};
import { message, Steps, theme } from 'antd';
export function ModalView ({ open, title, onCancel, onOk }: Props) {
  const steps = [
    {
      title: 'Phạm vi đánh giá độ phủ đại lý',
      content: <ScopeAnalysis></ScopeAnalysis>,
    },
    {
      title: 'Ngành hàng đánh giá độ phủ',
      content: <ScopeAnalysis></ScopeAnalysis>,
    },
    {
      title: 'Thiết lập kết quả phân tích',
      content: <ScopeAnalysis></ScopeAnalysis>,
    },
  ];
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <Modal
        width = {850}
        open={open}
        title= {title}
        onOk={onOk}
        onCancel={onCancel}
        footer={[
          // <Button key="back" onClick={onCancel}>
          //   Return
          // </Button>,
          // <Button key="submit" type="primary"  onClick={onOk}>
          //   Submit
          // </Button>,
          // <Button
          //   key="link"
          //   href="https://google.com"
          //   type="primary"
          //   onClick={onOk}
          // >
          //   Search on Google
          // </Button>,
        ]}
      >
              <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Tiếp theo
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Hoàn thành
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Quay lại
          </Button>
        )}
      </div>
      </Modal>
      </>
  );
}

