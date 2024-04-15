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

export default function CustomerList({data,handleData}:Props) {
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
            render: (value:string,record:any) => {
                return <Select 
                mode="multiple"
                options={optionsFrequency}
                style={{ width: '100%' }}
                placeholder="Chọn tần suất"
                onChange={(frequency: string[]) => {                    
                    handleData(prev => {
                        console.log({prev},prev.map(customer => {
                            if(customer.customer_code == record.customer_code) {
                                customer['frequency'] = frequency.toString().replaceAll(",",";")
                            }
                            return customer
                        }));
                        
                        return prev.map(customer => {
                            if(customer.customer_code == record.customer_code) {
                                customer['frequency'] = frequency.toString().replaceAll(",",";")
                            }
                            return customer
                        })
                    })
                }}
                defaultValue={ value ? value.split(';') : ['1','2',"3","4"]}
                />
            }
        },{
            title: "Hành động",
            dataIndex: "",
            key: "action",
            render: (_:any,customer:CustomerType) => {
                return <div className='flex justify-center' onClick={() => {
                    handleData((prev:any[]) => {
                        return [...prev.filter((cs) => cs.customer_code != customer.customer_code )]
                    })
                }}><DeleteOutlined /></div>
            }
        },
    
    ] 
  return (
    <div className=''>
    <TableCustom 
        columns={columnsCustomer}
        dataSource={data}
        pagination={false}
    />
    </div>
  )
}
 
