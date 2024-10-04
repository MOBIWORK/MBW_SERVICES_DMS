/** @format */

import { useState } from "react";
import { HeaderPage } from "@/components";
import { handleDowload } from "@/util";
import { SyncOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";

interface ReportHeaderProps {
  setRefresh: (value: boolean) => void;
  title: string | JSX.Element;
  params: any;
  file_name: string;
}
const ReportHeader = ({
  setRefresh,
  title,
  params,
  file_name,
}: ReportHeaderProps) => {
  const [isExcel, setIsExcel] = useState<boolean>(false);

  return (
    <HeaderPage
      title={title}
      buttons={[
        {
          icon: <SyncOutlined className="text-xl size-4 mb-1 mr-[2px]" />,
          className: "flex mr-2 h-7 mt-6",
          action: () => {
            setRefresh((prev: boolean) => !prev);
          },
        },
        {
          disabled: isExcel,
          label: "Xuất dữ liệu",
          type: "primary",
          icon: <VerticalAlignBottomOutlined className="text-xl" />,
          size: "18px",
          className: "flex items-center h-7 mt-6",
          action: handleDowload.bind(
            null,
            {
              url: "/api/method/mbw_dms.api.exports.export_excel.export_excel",
              params: params,
              file_name,
            },
            setIsExcel
          ),
        },
      ]}></HeaderPage>
  );
};

export default ReportHeader;
