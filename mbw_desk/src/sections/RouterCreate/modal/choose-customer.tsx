import { Button, Col, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import { FormItemCustom, TableCustom, TagCustom } from "@/components";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { LuFilter, LuFilterX } from "react-icons/lu";
import type { ColumnsType } from "antd/es/table";
import { CustomerType } from "../type";
import {
  FilterForm,
  baseCustomers,
  commonColumnCustomer,
  commonTable,
} from "../data";
import FilterCustomer from "./filter";
import { useForm } from "antd/es/form/Form";

const columnSelectCustomer: ColumnsType<CustomerType> = [
  ...commonTable,

  {
    title: "Loại khách hàng",
    dataIndex: "customer_id",
    key: "customer_type",
  },
  {
    title: "Nhóm khách hàng",
    dataIndex: "customer_name",
    key: "customer_group",
  },
  ...commonColumnCustomer,
];

const handleFilter = (filters: any): Array<any> => {
  let arrayFilter: any[] = [];
  for (let key_search in filters) {
    if (filters[key_search]) {
      arrayFilter = [
        ...arrayFilter,
        { key: [FilterForm[key_search]], value: filters[key_search],key2: key_search},
      ];
    }
  }
  return arrayFilter;
};

export function ChooseCustomer() {
  const [form] = useForm();
  const [customerChoose, setCustomerChoose] = useState<CustomerType[]>([]);
  const [customerList, setCustomerList] =
    useState<CustomerType[]>(baseCustomers);
  const [filter, setFilter] = useState<{}>({});
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: CustomerType[]) => {
      setCustomerChoose(selectedRows);
    },
  };

  const handleSubmitFilter = () => {
    form.submit()
    setOpenFilter(false)
  }

  const handleClearFilter = (fil?:any) => {
    if(fil) {
        let newFilter = {...filter}
        delete newFilter[fil.key2]
        form.setFieldsValue(newFilter)
        setFilter(prev => {
            delete prev[fil.key2]
            return {...prev}
        })
        
    }else {
        console.log('hể');
        
        form.resetFields()
        setFilter({})
    }
  }
  return (
    <>
      <Row className="justify-between">
        <Col className="inline-flex ">
          <FormItemCustom>
            <Input
              placeholder="Tìm kiếm khách hàng"
              prefix={<SearchOutlined />}
            />
          </FormItemCustom>
          <div className="flex justify-center items-center ml-4">
            <Button
              className="flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-[36px]"
              icon={<LuFilter style={{ fontSize: "20px" }} />}
              onClick={setOpenFilter.bind(null, true)}
            >
              Filter
            </Button>
            <Button
              className="border-l-[0.1px] rounded-l-none h-[36px]"
              onClick={() => handleClearFilter()}
            >
              <LuFilterX style={{ fontSize: "20px" }} />
            </Button>
          </div>
        </Col>
        <Col className="inline-flex items-center">
          <span className="mr-4">
            Đã chọn {customerChoose.length} khách hàng
          </span>
          <Button type="primary">Thêm</Button>
        </Col>
      </Row>
      <div className="py-5 px-4">
        <span>{customerList.length} kết quả hiển thị</span>
        {handleFilter(filter).length > 0 && (
          <Row className="items-center">
            {handleFilter(filter).map((fil: any) => (
              <TagCustom closeIcon={<CloseOutlined />} onClose={() => {
                handleClearFilter(fil)
              }}>
                {fil.key}: {fil.value}
              </TagCustom>
            ))}
            <span className="cursor-pointer" onClick={() => handleClearFilter()}>Clear all</span>
          </Row>
        )}
      </div>
      <TableCustom
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columnSelectCustomer}
        dataSource={customerList.map((value: CustomerType) => ({
          key: value.customer_id,
          ...value,
        }))}
      />
      <Modal
        width={451}
        title="Bộ lọc"
        open={openFilter}
        okText="Áp dụng"
        cancelText="Đặt lại"
        onCancel={setOpenFilter.bind(null, false)}
        onOk={handleSubmitFilter}
      >
        <FilterCustomer filter={filter} setFilter={setFilter} form={form} />
      </Modal>
    </>
  );
}
