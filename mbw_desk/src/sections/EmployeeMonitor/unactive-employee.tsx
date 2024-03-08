import { FormItemCustom } from "../../components";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CardCustom from "./components/CustomerCard";
import data from "./datamonitor/dataunactive.json";

export default function UnActiveEmployee() {
  return (
    <>
      <div className="border-[#DFE3E8] border-b-[1px] border-x-0 border-t-0 border-solid">
        <FormItemCustom className="w-full border-none pr-4 pb-3">
          <Input
            className="!bg-[#F4F6F8]"
            placeholder="Tìm kiếm sản phẩm"
            prefix={<SearchOutlined />}
          />
        </FormItemCustom>
      </div>

      <div className="overscroll-none h-[70vh] overflow-y-scroll">
        <CardCustom data={data} color={'rgb(169,169,169)'} status="Không hoạt động"/>
      </div>
    </>
  );
}
