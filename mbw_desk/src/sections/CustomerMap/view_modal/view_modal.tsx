import { useContext, useState } from "react";
import { AxiosService } from "../../../services/server";
import { Modal, Button, Form } from "antd";
import axios from "axios";
import { ScopeAnalysis } from "./steps/scope_analysis";
import { TypeIndustry } from "./steps/type_industry";
type Props = {
  open: boolean;
  title: string;
  onCancel: functionType;
  onOk: functionType;
  lstCustomer: any[];
  api: any;
};
import { message, Steps, theme } from "antd";
import { functionType } from "@/types/dashboard";
import { errorToast } from "@/util";
import classNames from "classnames";
import { GlobalContext } from "@/App";
export function ModalView({
  open,
  title,
  onCancel,
  onOk,
  lstCustomer,
  api,
}: Props) {
  const {errorMsg} = useContext(GlobalContext);
  const [formAnalysis] = Form.useForm()
  const [scopeResult, setScopeResult] = useState(null);
  const [bbox, setBbox] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleScopeResult = (result: any) => {
    if (result) {
      setScopeResult(result);
      setBbox(result.bbox);
    }
  };

  const steps = [
    {
      title: "Phạm vi đánh giá độ phủ đại lý",
      content: (
          <ScopeAnalysis
            form={formAnalysis}
            onResult={handleScopeResult}
            scopeResult={scopeResult}
            api={api}
          ></ScopeAnalysis>
      ),
    },
    {
      title: "Ngành hàng đánh giá độ phủ",
      content: (
          <TypeIndustry form={formAnalysis}></TypeIndustry>
      ),
    },
  ];
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const handleSubmit = async () => {
    console.log("value submit",formAnalysis.getFieldsValue());    
    try {
      setLoadingSubmit(true);
      // await new Promise((rs,rj) => setTimeout(rs,2000))
      let valueForm =formAnalysis.getFieldsValue();
      let locations = [];
      let type_categories = "agricultural_supplies";
      let type_area = "";
      let value_area:any[] = [];
      console.log("lstCustomer",lstCustomer);
      
      if (lstCustomer && lstCustomer.length > 0) {
        for (let i = 0; i < lstCustomer.length; i++) {
          let lngLat = lstCustomer[i].customer_location_primary && JSON.parse(lstCustomer[i].customer_location_primary);
          if(lngLat && lngLat.long && lngLat.lat) {
            let coordinates = [lngLat.long, lngLat.lat];
            locations.push(coordinates);
          }
        }
      }
      // validate
      if (!valueForm["nganhhang"]) {
        throw new Error("Chưa chọn ngành hàng ");
      }

      if(!valueForm["tinh"] && !valueForm["khuvuc"]) {
        throw new Error("Chưa chọn khu vực giới hạn");
      }
      else if (valueForm["tinh"]) {
        type_area = "administrative_province";
        value_area = [formAnalysis.getFieldValue("tinh")];
      }
      else if (!valueForm["tinh"] && valueForm["khuvuc"]) {
        type_area = "administrative_region";
        if(["all"].includes(valueForm["khuvuc"])) {
          value_area = ["1", "2", "3", "4", "5", "6", "7"];
        }
        else {
          value_area = [formAnalysis.getFieldValue("khuvuc")];
        }
      }

      const dataPost = {
        type_categories: type_categories,
        type_area: type_area,
        value_area: JSON.stringify(value_area),
        locations: locations,
      }
      
      const apiUrl = `https://api.ekgis.vn/v1/analytic_market/determine_coverage?api_key=${import.meta.env.VITE_API_KEY}`;
    
      const response = await axios.post(apiUrl, JSON.stringify(dataPost));
      const responseData = response.data;
      if (responseData) {
        setLoadingSubmit(false);
        message.success("Phân tích thành công");
        saveConfigMap(dataPost as any, responseData as any);
        onOk(responseData, dataPost, bbox);
        setCurrent(0);
      } else {
        throw new Error("Phân tích thất bại");
      }
    } catch (error:any) {
      // console.log("Lỗi vlllllllllllllll",error,error.message);
      
      errorMsg(error?.message as string);
    } finally {
      setLoadingSubmit(false);
    }
  };
  async function saveConfigMap(dataPost:any, responseData:any) {
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
       await AxiosService.post(
        "api/method/frappe.desk.form.save.savedocs",dataPostSave
      );
      
    }catch (error:any) {
      errorMsg(error?.message as string);
    }
 
  }

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  return (
    <>
      <Modal
        width={850}
        open={open}
        title={title}
        onOk={onOk}
        onCancel={onCancel}
        footer={false}
      >
        <Steps current={current} items={items} />
        <Form layout="vertical" form={formAnalysis} style={{ padding: "10px" }}>
          {steps.map((item,index) => 
          <div className={classNames(index == current ? "block": "hidden")}>{item.content}</div>
          )}
        </Form>
        
        <div
          style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}
        >
          {current < steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => setCurrent((prev) => prev + 1)}
            >
              Tiếp theo
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loadingSubmit}
            >
              Hoàn thành
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{ margin: "0 8px" }}
              onClick={() => setCurrent((prev) => prev - 1)}
            >
              Quay lại
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
}
