/** @format */

import { TableCustom } from "@/components";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import React, { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { columnChooseCs } from "./data";


import { AxiosService } from "@/services/server";
import useDebounce from "@/hooks/useDebount";
import { CustomerType as CustomerProps } from "@/sections/RouterCreate/type";

import { useDispatch, useSelector } from "react-redux";
import { setPromotionChooseCustomer } from "@/redux/slices/promotion-slice";
import { CustomerType } from "@/components/filter-group/filter-items/customer-type-filter";
import { CustomerGroup } from "@/components/filter-group/filter-items/customer-group-filter";
interface Props {
  handleSetStateFunction?: (value: any) => void;
  setDataCustomer?: (value: any) => void;
}
type DataType = any;
function ModalChooseCs(props: Props) {
  const pageSize = 10;
  const { setDataCustomer, handleSetStateFunction } = props;
  const [customerList, setcustomerList] = React.useState<DataType[]>([]);
  const [valueSearch, setValueSearch] = useState<String>("");

  const [total, setTotal] = useState<number>();
  const [page, setPage] = useState<number>(1);

  const { customer_type, customer_group } = useSelector(
    (state: any) => state.group
  );
  const { promotionChooseCustomer } = useSelector(
    (state: any) => state.promotion
  );
  const [customerChoose, setCustomerChoose] = useState<{
    [key: number]: CustomerProps[];
  }>({ 1: [] });

  const dispatch = useDispatch();

  const rowSelection = {
    selectedRowKeys: promotionChooseCustomer,
    onChange: (selectedRowKeys: React.Key[], selectedRows: CustomerProps[]) => {
      setCustomerChoose((prev) => {
        return {
          ...prev,
          [page]: selectedRows,
        };
      });
    },
  };

  useEffect(() => {
    const flatData = Object.values(customerChoose).flat();
    const arrCode = flatData.map((item) => item.customer_code);
    dispatch(setPromotionChooseCustomer(arrCode));
  }, [customerChoose]);

  useEffect(() => {
    handleSetStateFunction && handleSetStateFunction(setCustomerChoose);
  }, [handleSetStateFunction]);
  const textSearchCustomer = useDebounce(valueSearch);

  useEffect(() => {
    (async () => {
      let customers: any = await AxiosService.get(
        "/api/method/mbw_dms.api.router.get_customer",
        {
          params: {
            teamSale: "Sales Team",
            search_key: textSearchCustomer,
            page_size: pageSize,
            page_number: page,
            customer_group,
            sfa_customer_type: customer_type,
          },
        }
      );

      let { result } = customers;
      setcustomerList(result.data);
      setDataCustomer &&
        setDataCustomer((prev: any) => [...prev, ...result.data]);
      setTotal(result.total);
    })();
  }, [textSearchCustomer, page, customer_type, customer_group]);

  return (
    <>
      <Form layout="vertical">
        <Row className="items-center justify-between">
          <Col span={12}>
            <Row gutter={10}>
              <Col span={12}>
                <CustomerType className="w-full mb-4" />
              </Col>
              <Col span={12}>
                <CustomerGroup className="w-full" />
              </Col>
            </Row>
          </Col>
          <Col>
            <Input
              className="h-[35px] w-[268px] bg-[#F4F6F8]"
              placeholder="Search..."
              prefix={<SearchOutlined size={32} />}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValueSearch(e.target.value);
              }}
            />
          </Col>
        </Row>
      </Form>
      <div className="-mx-6">
        <TableCustom
          $border
          bordered
          scroll={{ y: 500 }}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columnChooseCs}
          dataSource={
            customerList &&
            customerList.map((value: DataType) => ({
              key: value.customer_code,
              ...value,
            }))
          }
          pagination={
            total && total > pageSize
              ? {
                  pageSize: pageSize,
                  showSizeChanger: false,
                  total,
                  current: page,
                  onChange(page) {
                    setPage(page);
                  },
                }
              : false
          }
        />
      </div>
    </>
  );
}

export default ModalChooseCs;

interface headerCustomer {
  handleClose: (value: any) => void;
  setChooseCustomer: (value: any) => void;
  functionSetStateCustomer: SetStateAction<any>;
  customerList: DataType[];
}

export const Header = ({
  handleClose,
  customerList,
  setChooseCustomer,
  functionSetStateCustomer,
}: headerCustomer) => {
  const { promotionChooseCustomer } = useSelector(
    (state: any) => state.promotion
  );

  const dispatch = useDispatch();
  const handlerSubmitCustomer = () => {
    const chosesCustomer = customerList.filter((item: DataType) => {
      return promotionChooseCustomer.includes(item.customer_code);
    });

    setChooseCustomer((prev: DataType[]) => {
      const mergeArr = [...prev, ...chosesCustomer];
      //loc customer da co' trong bang
      const filter = Array.from(
        new Map(mergeArr.map((item) => [item.customer_code, item])).values()
      );
      return filter;
    });
    functionSetStateCustomer({ 0: [] });
    handleClose(false);
  };

  const handleCancerButton = () => {
    dispatch(setPromotionChooseCustomer([]));
    handleClose(false);
    functionSetStateCustomer({ 0: [] });
  };
  return (
    <Row className="items-center justify-between">
      <Col span={8}>
        <h2 className="ml-1">Danh sách khách hàng</h2>
      </Col>
      <Col span={14} className=" justify-end">
        <Row gutter={10} className="justify-end items-center">
          <span className="mr-2">
            Đã chọn {promotionChooseCustomer.length} khách hàng
          </span>
          <Col>
            <Button type="primary" onClick={handlerSubmitCustomer}>
              Hoàn thành
            </Button>
          </Col>
          <Col>
            <Button onClick={handleCancerButton}>Hủy</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
