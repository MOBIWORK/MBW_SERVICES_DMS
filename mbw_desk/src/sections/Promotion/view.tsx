/** @format */

import {ContentFrame, DropDownCustom, HeaderPage, TableCustom} from "@/components";
import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {Button, Col, Dropdown, Input, message, Modal, Row} from "antd";
import { PAGE_SIZE } from "@/constant";
import { useResize } from "@/hooks";
import DropDownFilter from "@/components/filter-group/dropDownFilter";
import { AxiosService } from "@/services/server";
import { useSelector } from "react-redux";

import { TableRowSelection } from "antd/es/table/interface";
import { DataType } from "./PromotionCreate/Steps/StepTwo/modalChooseItem";
import { renderColumn } from "./PromotionCreate/components/_data";
import useDebounce from "@/hooks/useDebount";
import {
  CloudDownloadOutlined,
  CloudUploadOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { VscAdd } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  clearPromotion,
  setPromotionCustomerGroup,
} from "@/redux/slices/promotion-slice";
import { setTerritory } from "@/redux/slices/groups-slice";
import { handleDowload } from "@/util";
import { NoticeType } from "antd/es/message/interface";
import { setMessage } from "@/redux/slices/message-slice";
import {MdKeyboardArrowDown} from "react-icons/md";
import {rsData} from "@/types/response.ts";
const Promotion = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [textSearch, setTextSearch] = useState<string | undefined>(undefined);
  const [dataPromotion, setDataPromotion] = useState<any[]>([]);
  const size = useResize();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isExcel, setIsExcel] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();

  const { message: reponseMessage, type } = useSelector(
    (state: any) => state.message
  );

  useEffect(() => {
    if (reponseMessage && reponseMessage.message !== "") {
      showMessage(reponseMessage, type);
    }
  }, [reponseMessage]);

  const showMessage = (message: string, type: NoticeType) => {
    messageApi.open({
      type,
      content: message,
    });

    dispatch(setMessage({ message: "", type: "" }));
  };

  const { startDate, endDate } = useSelector((state: any) => state.date);
  const { customer_group, territory, status, type_promotion } = useSelector(
    (state: any) => state.group
  );

  const {
    promotionData: { customer_type },
  } = useSelector((state: any) => state.promotion);

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys: selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };
  const [action, setAction] = useState<{
    isOpen: boolean;
    data: any;
    action: string | false;
  }>({
    isOpen: false,
    data: null,
    action: false,
  });
  const deboundSearch = useDebounce(textSearch);
  useEffect(() => {
    (async () => {
      const rsData = await AxiosService.get(
        "/api/method/mbw_dms.api.promotion.promotion.get_list_promotion",
        {
          params: {
            search_text: deboundSearch,
            page_size: PAGE_SIZE,
            page_number: page,
            start_time: startDate,
            end_time: endDate,
            ctype_name: customer_type[0]?.value, //loại hình
            gtype_name: customer_group, //nhóm kh,
            territory: territory,
            status: status,
            ptype_value: type_promotion, //hình thức
          },
        }
      );

      setDataPromotion(rsData?.result);
      setTotal(rsData?.result?.totals);
    })();
  }, [
    page,
    refresh,
    startDate,
    endDate,
    customer_type[0]?.value,
    customer_group,
    territory,
    status,
    type_promotion,
    deboundSearch,
  ]);
  const handleUpdate = useCallback(
    async (type: string, value: string) => {
      // try {
        let rsUpdate: rsData<promotion[]> = await AxiosService.patch(
          "/api/method/mbw_dms.api.promotion.promotion.delete_multi",
          {
            name: selectedRowKeys,
            [type]: value,
          }
        );
        // successMsg("Cập nhật khuyến mại thành công");
        const rsData = await AxiosService.get(
        "/api/method/mbw_dms.api.promotion.promotion.get_list_promotion",
        {
          params: {
            search_text: deboundSearch,
            page_size: PAGE_SIZE,
            page_number: page,
            start_time: startDate,
            end_time: endDate,
            ctype_name: customer_type[0]?.value, //loại hình
            gtype_name: customer_group, //nhóm kh,
            territory: territory,
            status: status,
            ptype_value: type_promotion, //hình thức
          },
        }
      );

      setDataPromotion(rsData?.result);
      setTotal(rsData?.result?.totals);
        setAction({
          isOpen: false,
          action: false,
          data: null,
        });
      // } catch (err) {
      //   errorMsg("Cập nhật khuyến mại thất bại");
      // }
    },
    [selectedRowKeys]
  );

  const handleTextSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const txtSearch = e.target.value;
    setTextSearch(txtSearch);
  };

  const handleAddNewPromotion = () => {
    navigate("/promotion/promotion-create");
    dispatch(clearPromotion(""));
  };

  useEffect(() => {
    dispatch(clearPromotion(""));
    dispatch(setPromotionCustomerGroup(undefined));
    dispatch(setTerritory(undefined));
  }, []);
  return (
    <>
      {contextHolder}
      <ContentFrame
        header={
          <HeaderPage
            title="Chương trình khuyến mại"
            buttons={[
              {
                // label: "Xuất excel",
                icon: <SyncOutlined className="text-xl leading-5" />,
                size: "18px",
                className: "flex mr-2 mt-6",
                action: () => {
                  setRefresh((prev) => !prev);
                },
              },
              {
                disabled: isExcel,
                // label: "Xuất excel",
                icon: <CloudDownloadOutlined className="text-xl leading-5" />,
                size: "20px",
                className: "flex items-center mr-2 mt-6",
                action: handleDowload.bind(
                  null,
                  {
                    url: "/api/method/mbw_dms.api.promotion.export_promotion",
                    params: {
                      promotion_ids: selectedRowKeys.join("; "),
                    },
                    file_name: "promotion.xlsx",
                  },
                  setIsExcel
                ),
              },
              {
                // label: "Nhập excel",
                icon: <CloudUploadOutlined className="text-xl leading-5" />,
                size: "20px",
                className: "flex items-center mr-2 mt-6",
                action: () => {
                  // translationUrl(`/app/data-import/new-data-import`);
                },
              },
              {
                label: "Thêm mới",
                type: "primary",
                icon: <VscAdd className="text-xl leading-5" />,
                size: "20px",
                className: "flex items-center mt-6",
                action: handleAddNewPromotion,
              },
            ]}
            customButton={
              <>
                <Dropdown
                  trigger={["click"]}
                  placement="bottomRight"
                  dropdownRender={(menu) => (
                    <DropDownCustom>
                      <div className="-m-2">
                        <div
                          className="py-2 px-4 cursor-pointer hover:bg-[#f5f5f5] w-[168px]"
                          onClick={setAction.bind(null, {
                            isOpen: true,
                            action: "Khoá",
                            data: {
                              type: "status",
                              value: "Khóa",
                            },
                          })}
                        >
                          Khóa chương trình
                        </div>
                        <div
                          className="py-2 px-4 cursor-pointer hover:bg-[#f5f5f5] w-[168px]"
                          onClick={setAction.bind(null, {
                            isOpen: true,
                            action: "Mở",
                            data: {
                              type: "status",
                              value: "Hoạt động",
                            },
                          })}
                        >
                          Mở chương trình{" "}
                        </div>
                        <div
                          className="py-2 px-4 cursor-pointer hover:bg-[#f5f5f5] w-[168px]"
                          onClick={setAction.bind(null, {
                            isOpen: true,
                            action: "Xóa",
                            data: {
                              type: "is_deleted",
                              value: "set",
                            },
                          })}
                        >
                          Xóa chương trình
                        </div>
                      </div>
                    </DropDownCustom>
                  )}
                >
                  <Button type="primary" className="ml-2 flex items-center mt-6">
                    {" "}
                    Hành động{" "}
                    <span className="text-base">
                      <MdKeyboardArrowDown />
                    </span>{" "}
                  </Button>
                </Dropdown>
              </>
            }
            actions={selectedRowKeys.length > 0 ? true : false}
            // promption={true}
            listPromotion={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            setRefresh={setRefresh}
          />
        }>
        <div className="bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid overflow-hidden">
          <Row
            gutter={[16, 16]}
            className={`pr-4 items-center justify-between mt-4 `}>
            <Col className="ml-4 w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[20%]">
              <Input
                value={textSearch}
                onChange={handleTextSearch}
                className="w-full"
                placeholder="Tìm kiếm theo tên hoặc mã khách hàng"
              />
            </Col>

            <Col className="!ml-4">
              <DropDownFilter
                inputFromDate
                inputToDate
                inputCustomerGroup
                inputStatus
                inputPromotionType
                inputCustomerTypePromotion
                inputTerritory
                setPage={setPage}
                promotionType={true}
              />
            </Col>
          </Row>

          <div className="mt-5 ">
            <TableCustom
              columns={renderColumn(page)}
              bordered
              $border
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              dataSource={dataPromotion?.data?.map((report: any) => ({
                key: report.name,
                ...report,
              }))}
              pagination={
                total && total > PAGE_SIZE
                  ? {
                      pageSize: PAGE_SIZE,
                      showSizeChanger: false,
                      total,
                      current: page,
                      onChange(page) {
                        setPage(page);
                      },
                    }
                  : false
              }
              scroll={{
                x: true,
                // y: containerHeight < 300 ? undefined : scrollYTable1,
                y: dataPromotion?.data?.length > 0 ? size?.h * 0.6 : undefined,
              }}
            />
          </div>
        </div>
      </ContentFrame>

      <Modal
        open={action.isOpen}
        onCancel={setAction.bind(null, {
          isOpen: false,
          data: null,
          action: false,
        })}
        cancelText="Huỷ"
        okText="Đồng ý"
        onOk={handleUpdate.bind(null, action.data?.type, action.data?.value)}
        title={`${action.action} chương trình khuyến mại`}
      >
        <span>
          {action.action} {selectedRowKeys.length} đã chọn ?
        </span>
      </Modal>
    </>
  );
};

export default Promotion;
