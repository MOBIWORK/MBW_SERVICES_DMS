import React from 'react'
import { CustomerType } from './type'
import type { ColumnsType } from 'antd/es/table'
import { baseCustomers, commonColumnCustomer, commonTable, optionsFrequency } from './data'
import { TableCustom } from '../../components'
import {DeleteOutlined} from '@ant-design/icons'
import { Select, Table } from 'antd'

type Props = {
    data?: CustomerType[],
    handleData: any
}

const columnsCustomer:ColumnsType<CustomerType> = [
    {
        title: "Stt",
        dataIndex: "stt",
        key: "stt",
        render: (_,record,index) => index +1
    }, 
    ...commonTable,
    ...commonColumnCustomer
    ,{
        title: "Tần suất",
        dataIndex: "frequency",
        key: "frequency",
        render: (value:string) => {
            return <Select 
            mode="multiple"
            options={optionsFrequency}
            style={{ width: '100%' }}
            placeholder="Chọn tần suất"
            defaultValue={value ? value.split(';') : []}
            />
        }
    },{
        title: "Hành động",
        dataIndex: "",
        key: "action",
        render: (_:any,customer:CustomerType) => {
            return <div className='flex justify-center'><DeleteOutlined /></div>
        }
    },

] 
export default function CustomerList({data,handleData}:Props) {
  return (
    <div className='p-4'>
    <TableCustom 
        columns={columnsCustomer}
        dataSource={data}
        pagination={false}
    />
    </div>
  )
}
 
