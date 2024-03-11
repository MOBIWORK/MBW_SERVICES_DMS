import { FormItemCustom} from "../../components";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import data from "./datamonitor/dataactive.json"
import CardCustom from "./components/CustomerCard";

export default function ActiveEmployee() {
  return (
    <>
      <div className="border-[#DFE3E8] border-b-[1px] border-x-0 border-t-0 border-solid">
        <FormItemCustom className="w-full border-none px-4 pb-3">
          <Input
            className="!bg-[#F4F6F8]"
            placeholder="Tìm kiếm sản phẩm"
            prefix={<SearchOutlined />}
          />
        </FormItemCustom>
      </div>

      <div className="overscroll-none h-[70vh] overflow-y-scroll">
        <CardCustom data={data} color={'green'} status="Đang hoạt động"/>
      </div>
    </>
  );
}
