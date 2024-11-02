import React from 'react'
import {List } from "antd";
import { functionType } from '@/types/dashboard';
interface Props {
    item: any,
    handleShowHistoryEmployee: functionType,
    type: "distance"|"summary",
    rowIndex: number
}

function EmployeeItem(props: Props) {
    const {item,rowIndex,handleShowHistoryEmployee,type} = props

    return (
        <List.Item>
        <div
          className="flex items-center justify-between"
          style={{ width: "100%" }}
        >
            {type == "distance" && (
                rowIndex == 0 ?  <div
                style={{
                  width: "24px",
                  height: "24px",
                  backgroundSize: "Cover",
                }}
                className="icon_first"
              ></div> :
              rowIndex == 1 ? <div
              style={{
                width: "24px",
                height: "24px",
                backgroundSize: "Cover",
              }}
              className="icon_second"
            ></div>:
            rowIndex == 2 &&  <div
            style={{
              width: "24px",
              height: "24px",
              backgroundSize: "Cover",
            }}
            className="icon_third"
          ></div>
            )}
          <div
            className="flex items-center"
            style={{ width: "70%" }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                height: "48px",
                width: "48px",
                borderRadius: "12px",
              }}
            >
              {item.pic_profile != null ? (
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundImage: `url("${item.pic_profile}")`,
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
              onClick={() =>
                handleShowHistoryEmployee(item)
              }
            >
              <div
                style={{
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "21px",
                }}
              >
                {item.emp_name}
              </div>
              <div
                style={{
                  marginTop: "5px",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "21px",
                }}
              >
                ID: {item.emp_id}
              </div>
            </div>
          </div>
          {
            type == "distance" &&  <div
            style={{
              marginRight: "10px",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "22px",
              color: "#1877F2",
            }}
          >
            {item.distance}
          </div>
          }
          {type == "summary" && <div style={{ width: "30%" }} className="flex">
            <div
              className="items-center mx-3 flex"
              style={{ flexDirection: "column" }}
            >
              <div
                style={{
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "22px",
                }}
              >
                {item.visiting}
              </div>
              <div
                className="flex items-center justify-center"
                style={{ width: "20px", height: "20px" }}
              >
                <div
                  style={{
                    width: "14px",
                    height: "17px",
                    backgroundSize: "Cover",
                  }}
                  className="icon_visiting"
                ></div>
              </div>
            </div>
            <div
              className="items-center mx-3 flex"
              style={{ flexDirection: "column" }}
            >
              <div
                style={{
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "22px",
                }}
              >
                {item.boxing}
              </div>
              <div
                className="flex items-center justify-center"
                style={{ width: "20px", height: "20px" }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "17px",
                    backgroundSize: "Cover",
                  }}
                  className="icon_boxing"
                ></div>
              </div>
            </div>
          </div>}
          
        </div>
      </List.Item>
    )
}

export default EmployeeItem
