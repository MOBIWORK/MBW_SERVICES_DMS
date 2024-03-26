import {MapEkgis} from "../../../components/mapEkgis";
import { Tabs } from "antd";
import Travel from "./travel";
import NotTravel from "./not_travel";
import { SearchOutlined } from "@ant-design/icons";
import { SearchCustome } from "../../../components/searchCustom";

export default function TravelControl() {
  return (
    <div className="flex flex-row">
      <div className="w-[400px]">
        <Tabs
          centered
          defaultActiveKey="1"
          items={[            
            {
              key: "not-travel",
              label: (
                <span className="px-2 text-base font-medium">
                  Chưa viếng thăm (10)
                </span>
              ),
              children: (
                <div className="pb-4  -mt-4">
                  <div className="p-4 w-full border border-[#DFE3E8] border-solid">
                    <SearchCustome
                      prefix={<SearchOutlined />}
                      placeholder="Tìm kiếm khách hàng "
                      variant="filled"
                    />
                  </div>
                  <div className="overflow-y-scroll h-[60vh]">
                    <NotTravel />
                  </div>
                </div>
              ),
            },
            {
              key: "travel",
              label: (
                <span className="px-2 text-base font-medium">
                  Đã viếng thăm (10)
                </span>
              ),
              children: (
                <div className="pb-4 -mt-4">
                  <div className="p-4 w-full border border-[#DFE3E8] border-solid">
                    <SearchCustome
                      prefix={<SearchOutlined />}
                      placeholder="Tìm kiếm khách hàng "
                      variant="filled"
                    />
                  </div>
                  <div className="overflow-y-scroll h-[60vh]">
                    <Travel />
                  </div>
                </div>
              ),
            }
          ]}
        />
      </div>
      <div className="flex-1 h-[72vh]">
        <MapEkgis id="hd"/>
      </div>
    </div>
  );
}
