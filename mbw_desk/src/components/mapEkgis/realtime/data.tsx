import { fucnctionType } from "@/types/dashboard";

 //bảng: cột nhân viên
export const renderColumnsCheckingEmployee = (handleShowHistoryEmployee:fucnctionType) =>  [
  {
    dataIndex: "stt",
    width: "50px",
  },
  {
    title: "Nhân viên",
    dataIndex: "emp_name",
    render: (text: any, record: any) => (
      <div className="flex items-center">
        <div
          className="flex items-center justify-center"
          style={{ height: "48px", width: "48px", borderRadius: "12px" }}
        >
          {record.pic_profile != null ? (
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundImage: `url("${record.pic_profile}")`,
                backgroundSize: "Cover",
              }}
            ></div>
          ) : (
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundSize: "Cover",
              }}
              className="icon_user_default"
            ></div>
          )}
        </div>
        <div
          className="mx-3"
          style={{ cursor: "pointer" }}
          onClick={() => handleShowHistoryEmployee(record)}
        >
          <div
            style={{ fontWeight: 500, fontSize: "14px", lineHeight: "21px" }}
          >
            {text}
          </div>
          {record.emp_id != null && (
            <div
              style={{
                marginTop: "5px",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "21px",
              }}
            >
              ID: {record.emp_id}
            </div>
          )}
        </div>
      </div>
    ),
  },
  {
    title: "Thời gian di chuyển",
    dataIndex: "moving",
  },
  {
    title: "Thời gian dừng",
    dataIndex: "stopping",
  },
  {
    title: "Thời gian viếng thăm",
    dataIndex: "visiting",
  },
];
