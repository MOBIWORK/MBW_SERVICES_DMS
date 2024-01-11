import React from 'react'
import { CustomerType } from './type'
import { ColumnType } from 'antd/es/table'
import { baseCustomers, commonTable, optionsFrequency } from './data'
import { TableCustom } from '../../components'
import {DeleteOutlined} from '@ant-design/icons'
import { Select } from 'antd'

type Props = {
    data?: CustomerType[] | false,
    handleData: any
}

const columnsCustomer = [
    ...commonTable,
    {
        title: "Địa chỉ",
        dataIndex: "display_address",
        key: "display_address"
    },
    {
        title: "Số điện thoại",
        dataIndex: "phone_number",
        key: "phone_number"
    },{
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
    <>
    <TableCustom 
        columns={columnsCustomer}
        dataSource={baseCustomers}
        pagination={false}
    />

    </>
  )
}
 