import { Button, Col, Input, Modal, Pagination, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
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
import { AxiosService } from "../../../services/server";
import { CustomerContext } from "../view";
type key = "customer_type"| "customer_group"| "city"| "district"|"ward"
type filterType = key[]

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

const handleFilter = (filters:filterType): Array<any> => {
  let arrayFilter: any[] = [];
  for (let key_search in filters) {
    if (filters[key_search]) {
      arrayFilter = [
        ...arrayFilter,
        { key: [FilterForm[key_search as key]], value: filters[key_search],key2: key_search},
      ];
    }
  }
  return arrayFilter;
};

type Props = {
  closeModal:() => void
}

export function ChooseCustomer({closeModal}:Props) {
  const {setCustomerRouter,customerRouter} = useContext(CustomerContext)
  const [form] = useForm();
  const [page_number,setPageNumber] = useState<number>(1)
  const [customerChoose, setCustomerChoose] = useState<{[key:number]:CustomerType[]}>({1: []});
  const [customerList, setCustomerList] =
    useState<CustomerType[]>([]);
  const [filter, setFilter] = useState<{}>({});
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const PAGE_SIZE=20
  const [total_Customer,setTotalNumber] = useState<number>(40)
  const rowSelection = {
    selectedRowKeys: customerChoose[page_number] ? customerChoose[page_number].map(value => value.customer_code) : [],
    onChange: (selectedRowKeys: React.Key[], selectedRows: CustomerType[]) => {
      setCustomerChoose((prev) => {
          return ({
            ...prev,
            [page_number]: selectedRows
          })
      });
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
        form.resetFields()
        setFilter({})
    }
  }
 

  const handleAddCustomer =() => {
    let chooseC = Object.keys(customerChoose).reduce((prev:any[],now:string) => {
      let now2 = Number.parseInt(now)
      return ([...prev,...customerChoose[now2]])
    },[])    
    setCustomerRouter([...customerRouter,...chooseC.filter(customer => !customerRouter.map((cs:CustomerType) => cs.customer_code).includes( customer.customer_code))].map(customer => {
      if(!customer.frequency) customer.frequency = "1;2;3;4"
      return customer
    }))
    
    closeModal()
  }
  useEffect(()=> {
    (async() => {
      const rsCustomer = await AxiosService.get('/api/method/mbw_dms.api.router.get_customer',{
        params: {
          ...filter,
          page_size: PAGE_SIZE,
          page_number
        }
      })
      setCustomerList(rsCustomer?.result?.data)
      setTotalNumber(rsCustomer.result?.total)
      
    })()
  },[filter,page_number])
  // useEffect(() => {
  // if(customerList.length>0)     {
  //   let csCode = customerList.map(cs => cs.customer_code)
  //   let selectedPage = selected.filter(csSelect => csCode.includes(csSelect.customer_code))
  //   console.log("selected",{csCode,selectedPage});
    
  //   setCustomerChoose((prev)=> {
  //     console.log("prev",prev);
      
  //     if(prev[page_number] && prev[page_number].length > 0){
  //       console.log("chọn cũ");
        
  //       return prev
  //     }else{
  //       console.log("chọn mới",selectedPage);
        
  //       if(Object.keys(prev).length > 0) {
  //         return {...prev,[page_number]: selectedPage}

  //       }else {
  //         return {[page_number]: selectedPage}
  //       }
  //     }

  //   })
    
  // }
  // },[selected,page_number,customerList])
  
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
              Bộ lọc
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
            Đã chọn {Object.keys(customerChoose).reduce((prev,now:any) => prev + customerChoose[now].length,0)} khách hàng

          </span>
          <Button type="primary" onClick={handleAddCustomer}>Thêm</Button>
        </Col>
      </Row>
      <div className="py-5 px-4">
        <span>{customerList.length} kết quả hiển thị</span>
        {handleFilter(filter as any).length > 0 && (
          <Row className="items-center">
            {handleFilter(filter  as any).map((fil: any) => (
              <TagCustom closeIcon={<CloseOutlined />} onClose={() => {
                handleClearFilter(fil)
              }}>
                {fil.key}: {fil.value}
              </TagCustom>
            ))}
            
          </Row>
        )}
      </div>
      <div className="-mx-6">
        <TableCustom
          scroll={{y: 500 }}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columnSelectCustomer}
          dataSource={customerList.map((value: CustomerType) => ({
            key: value.customer_code,
            ...value,
          }))}
          pagination={false}
        />
      </div>
      <Row className="justify-end mt-2">
        <Pagination showSizeChanger={false} defaultCurrent={page_number} pageSize={PAGE_SIZE}  total={total_Customer} onChange={(page,pageSize) => {
          setPageNumber(page);          
        }}/>
      </Row>
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
