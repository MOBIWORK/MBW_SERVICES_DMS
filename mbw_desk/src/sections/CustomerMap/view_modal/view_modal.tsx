import { useEffect, useRef, useState } from "react";
import { AxiosService } from "../../../services/server";
import { Modal,Button ,Form} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import  {ScopeAnalysis} from './scope_analysis';
import  {TypeIndustry} from './type_industry';
import  { ReactNode } from "react";
type Props = {
  open: string | ReactNode;
  title: string;
  onCancel : ReactNode;
  onOk: ReactNode;
};
import { message, Steps, theme } from 'antd';
export function ModalView ({ open, title, onCancel, onOk , lstCustomer,api}: Props) {
  const [formScope] = Form.useForm();
  const [formIndustry] = Form.useForm();
  const [scopeResult, setScopeResult] = useState(null);
  const [industryResult, setIndustryResult] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  
  const handleScopeResult = (result) => {
    setScopeResult(result);
  };
  const handleIndustryResult = (result) => {
    setIndustryResult(result);
  };
  const steps = [
    {
      title: 'Phạm vi đánh giá độ phủ đại lý',
      content: <Form layout="vertical" form={formScope} style={{padding: "10px"}}>
        <ScopeAnalysis form={formScope} onResult={handleScopeResult} scopeResult={scopeResult} api={api}></ScopeAnalysis>
      </Form> ,
    },
    {
      title: 'Ngành hàng đánh giá độ phủ',
      content:<Form layout="vertical" form={formIndustry} style={{padding: "10px"}}>
      <TypeIndustry form={formIndustry} ></TypeIndustry>
    </Form>,
    },
    // {
    //   title: 'Thiết lập kết quả phân tích',
    //   content: <ScopeAnalysis></ScopeAnalysis>,
    // },
  ];
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const handleSubmit = async () => {
    setLoadingSubmit(true)
    let locations = []
    let type_categories = "agricultural_supplies"
    let type_area = ''
    let value_area = []
    if(lstCustomer && lstCustomer.length > 0){
      for (let i = 0; i < lstCustomer.length; i++) {
        let lngLat = JSON.parse(lstCustomer[i].customer_location_primary)
        let coordinates = [lngLat.long, lngLat.lat]
        locations.push(coordinates)
      }
    }
    if(formIndustry.getFieldValue('nganhhang')){
      type_categories = formIndustry.getFieldValue('nganhhang')
    }else{
      setLoadingSubmit(false)
      message.error('Chưa chọn ngành hàng ')
      return
    }
    // if(formScope.getFieldValue('huyen') && formScope.getFieldValue('huyen').length > 0){
    //   type_area = 'administrative_district'
    //   value_area = formScope.getFieldValue('huyen')
    // }else 
    if(formScope.getFieldValue('tinh')){
      type_area = 'administrative_province'
      value_area = [formScope.getFieldValue('tinh')]
    }else if(formScope.getFieldValue('khuvuc')){
      type_area = 'administrative_region'
      if(formScope.getFieldValue('khuvuc').includes('all')){
        value_area = ['1','2','3','4','5','6','7']
      }else{
        value_area = [formScope.getFieldValue('khuvuc')]
      }
    }else{
      message.error('Chưa chọn khu vực giới hạn')
      setLoadingSubmit(false)
      return
    };
    const apiUrl = `https://api.ekgis.vn/v1/analytic_market/determine_coverage?api_key=w1Dlh2wRon7mE6sL196TgvLS45fw02uon74pJ0rc`;
    const dataPost  = {
    "type_categories": type_categories,
    "type_area": type_area,
    "value_area": JSON.stringify(value_area),
    "locations": locations
  }
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',

    },
    body: JSON.stringify(dataPost)
  });
  const responseData = await response.json();
  if(responseData){
    setLoadingSubmit(false)
    message.success('Phân tích thành công')
    saveConfigMap(dataPost,responseData)
    onOk(responseData, dataPost)
    setCurrent(0)
    
  }else{
    setLoadingSubmit(false)
    message.error('Phân tích thất bại')
    return
  }

  }
  const saveConfigMap = async (dataPost, responseData) => {
    try {
      const dataPostSave = {
        doc: JSON.stringify({
          doctype: "VGM_Map_Converage",
          map_name:'',
          map_setting:JSON.stringify(dataPost),
          map_sequence: JSON.stringify(responseData),
        }),
        action: "Save",
      };
      let res = await AxiosService.post(
        "api/method/frappe.desk.form.save.savedocs",dataPostSave
      );
      
    }catch (error) {
      
    }
 
  }
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const contentStyle: React.CSSProperties = {
    textAlign: 'left',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  async function postData(url = '', data = {}) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log('POST request successful. Response data:', responseData);
      return responseData; // Trả về dữ liệu từ phản hồi
    } catch (error) {
      console.error('Error posting data:', error);
      throw error; // Ném lỗi để xử lý ở bên ngoài (nếu cần)
    }
  }
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
          <Button type="primary" onClick={handleSubmit} loading={loadingSubmit}>
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

