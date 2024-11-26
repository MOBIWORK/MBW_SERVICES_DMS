/** @format */

import React, {
  useCallback,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import { Button, Col, Dropdown, Input, Modal, Row, message } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  FileAddOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { renderColumn, renderMenu } from "./data";
import ModalChooseCs, { Header } from "./modalChooseCs";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import { setPromotionCustomer } from "@/redux/slices/promotion-slice";
// type TableRowSelection<T extends object = object> =
//   TableProps<T>["rowSelection"];
import { TableRowSelection } from "antd/es/table/interface";
import { TableCustom } from "@/components";
import { ExportExcel, getAttrInArray } from "@/util";
import { ImportCustomer } from "@/sections/RouterCreate/modal";
import { AxiosService } from "@/services/server";
import { CustomerType } from "@/sections/RouterCreate/type";
import { UploadFile } from "antd/lib";
import { NoticeType } from "antd/es/message/interface";
import { PAGE_SIZE } from "@/constant";
import { RootState } from "@/redux/store";
import {
  setPromotionCustomerType,
  setPromotionCustomerGroup,
  setPromotionTerritory,
} from "@/redux/slices/promotion-slice";
type DataType = any;
interface Props {
  setDisableList: (value: boolean) => void;
}

function CustomerInfo(props: Props) {
  const { setDisableList } = props;
  const [chooseCustomer, setChooseCustomer] = useState<DataType[]>([]);
  const [filteredCustomer, setFilteredCustomer] = useState(chooseCustomer);
  const [inputSearch, setInputSearch] = useState("");
  const [openImport, setOpenImport] = useState<boolean>(false);
  const [dataImport, setDataImport] = useState<any[]>([]);
  const [files, setFile] = useState<UploadFile[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const [page, setPage] = useState<number>(1);
  const [customers, setCustomers] = React.useState<DataType[]>([]);

  const [modalChoose, setModalC] = React.useState<boolean>(false);

  const [chooseTotalCustomer, setChooseTotalCustomer] = useState<number>(0);

  const [functionSetStateCustomer, setFunctionSetStateCustomer] =
    useState<Dispatch<SetStateAction<object>> | null>(null);

  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();

  const { promotionData } = useSelector((state: RootState) => state.promotion);

  const customerData = promotionData.customers;

  useEffect(() => {
    if (customerData && customerData.length > 0)
      setChooseCustomer(customerData);
  }, [customerData]);

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys: selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };
  useEffect(() => {
    setChooseTotalCustomer(selectedRowKeys.length);
  }, [selectedRowKeys]);

  const handleDeleteCustomer = useCallback((customer_id: string) => {
    setChooseCustomer((prev: any) =>
      prev.filter((customer: DataType) => customer.customer_code != customer_id)
    );
  }, []);

  const handleDeleteMultiCustomer = useCallback((arrCode: string[]) => {
    setChooseCustomer((prev: any) => {
      return prev.filter((item: any) => {
        return !arrCode.includes(item.customer_code);
      });
    });
    setSelectedRowKeys([]);
  }, []);
  const handleDeleteAllCustomer = useCallback(() => {
    setChooseCustomer([]);
  }, []);

  const handleSetStateFunction = (setStateFunc: any) => {
    setFunctionSetStateCustomer(() => setStateFunc);
  };

  const handleRemove = useCallback((file: any) => {
    setFile((prev) => prev.filter((fl: any) => fl.uid != file.uid));
  }, []);

  const handleUpdateFile = async (file: any) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e?.target?.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      setDataImport(jsonData);
      file.status = "done";
      setFile([file]);
    };
    reader.readAsArrayBuffer(file);
  };

  const messageInfo = (mess: string, type: NoticeType) => {
    messageApi.open({
      type,
      content: mess,
    });
  };

  const handleImportCusTomer = async () => {
    let importCustomers = getAttrInArray(
      dataImport,
      ["Mã khách hàng", "Tên khách hàng", "Tần suất"],
      { isNull: false }
    );
    const customer_codes = importCustomers.map(
      (customer) => customer["Mã khách hàng"]
    );
    const list_customerCodes = customer_codes.filter(
      (code) =>
        !!code &&
        !customers
          .map((cust: CustomerType) => cust.customer_code)
          .includes(code)
    );
    try {
      const rsImport = await AxiosService.post(
        "/api/method/mbw_dms.api.router.get_customer_import",
        {
          customer_codes: list_customerCodes,
        }
      );
      let list_customer_import = rsImport.result;
      list_customer_import = list_customer_import.map((customer: any) => {
        let import_frequency = importCustomers.find(
          (cs) => cs["Mã khách hàng"] == customer.customer_code
        );
        if (import_frequency) {
          customer["frequency"] = import_frequency["Tần suất"];
        } else {
          customer["frequency"] = "1;2;3;4";
        }
        return customer;
      });

      setChooseCustomer((prev: any) => [...prev, ...list_customer_import]);
      messageInfo("Add record from local!", "success");
      setOpenImport(false);
    } catch (err: any) {
      messageInfo(err || "Something was wrong", "error");
    }
  };

  useEffect(() => {
    setFilteredCustomer(chooseCustomer);
    dispatch(setPromotionCustomer(chooseCustomer));
    if (chooseCustomer.length > 0) {
      dispatch(setPromotionCustomerType([]));
      dispatch(setPromotionCustomerGroup([]));
      dispatch(setPromotionTerritory([]));
      setDisableList(true);
    } else {
      setDisableList(false);
    }
  }, [chooseCustomer]);

  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const testSearch = e.target.value;
    setInputSearch(testSearch);

    // Lọc danh sách khách hàng theo customer_code
    const filtered = chooseCustomer.filter(
      (customer) =>
        customer.customer_code
          .toLowerCase()
          .includes(testSearch.toLowerCase()) ||
        customer.customer_name.toLowerCase().includes(testSearch.toLowerCase())
    );
    setFilteredCustomer(filtered);
  };

  return (
    <>
      {contextHolder}
      <Col span={24}>
        <Row className="justify-between pb-3">
          <Col>
            <Input
              className="h-[35px] min-w-[30%] bg-[#F4F6F8]"
              placeholder="Search..."
              prefix={<SearchOutlined size={32} />}
              value={inputSearch}
              onChange={handleInputSearch}
            />
          </Col>

          <Col className="w-[50%]">
            <Row gutter={10} className="w-full justify-end gap-4">
              <>
                <Dropdown
                  trigger={["click"]}
                  menu={{
                    items: renderMenu({
                      handleDeleteMultiCustomer,
                      handleDeleteAllCustomer,
                      total: chooseTotalCustomer,
                      choose: selectedRowKeys,
                    }),
                  }}
                  placement="bottomRight">
                  <div className="h-[32px] text-[#C4161C] border border-solid border-[#C4161C]  rounded-[4px] inline-flex items-center px-[12px] py-[7px] cursor-pointer">
                    <DeleteOutlined />{" "}
                    <span className="text-sm whitespace-nowrap">Xóa</span>
                  </div>
                </Dropdown>
              </>

              <Button
                type="primary"
                className=""
                onClick={() => setOpenImport(true)}>
                <FileAddOutlined />{" "}
                <span className="text-sm whitespace-nowrap">Import excel</span>
              </Button>

              <Button className="" onClick={setModalC.bind(null, true)}>
                <PlusOutlined />{" "}
                <span className="text-sm whitespace-nowrap">
                  Chọn khách hàng
                </span>
              </Button>
            </Row>
          </Col>
        </Row>
        <TableCustom
          bordered
          columns={renderColumn<DataType>({ handleDeleteCustomer })}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          dataSource={
            filteredCustomer &&
            filteredCustomer.map((value: DataType) => ({
              key: value.customer_code,
              ...value,
            }))
          }
          scroll={{
            x: "max-content",
          }}
          pagination={
            filteredCustomer.length && filteredCustomer.length > PAGE_SIZE
              ? {
                  pageSize: PAGE_SIZE,
                  showSizeChanger: false,
                  total: filteredCustomer.length,
                  current: page,
                  onChange(page) {
                    setPage(page);
                  },
                }
              : false
          }
        />
      </Col>
      <Modal
        width={1234}
        open={modalChoose}
        onCancel={setModalC.bind(null, false)}
        closeIcon={false}
        footer={false}
        title={
          <Header
            functionSetStateCustomer={functionSetStateCustomer}
            handleClose={setModalC}
            customerList={customers}
            setChooseCustomer={setChooseCustomer}
          />
        }>
        <ModalChooseCs
          handleSetStateFunction={handleSetStateFunction}
          setDataCustomer={setCustomers}
        />
      </Modal>

      <Modal
        width={777}
        open={openImport}
        onCancel={() => setOpenImport(false)}
        okText="Tiếp tục"
        cancelText="Hủy"
        title={
          <>
            <strong className="text-xl">Nhập dữ liệu khách hàng</strong>
            <br />
            <Button
              type="link"
              className="px-0"
              onClick={() => {
                ExportExcel({
                  doctype: "SFA Router Customer",
                  export_fields:
                    '{"SFA Router Customer":["name","display_address","customer","long","customer_code","phone_number","frequency","customer_name","lat"]}',
                  export_records: "blank_template",
                  // export_records: '5_records',
                  export_filters: null,
                  file_type: "Excel",
                });
              }}>
              Tải về file mẫu <DownloadOutlined />
            </Button>
          </>
        }
        onOk={handleImportCusTomer}>
        <ImportCustomer
          handleFile={handleUpdateFile}
          files={files}
          removeFile={handleRemove}
        />
      </Modal>
    </>
  );
}

export default CustomerInfo;
