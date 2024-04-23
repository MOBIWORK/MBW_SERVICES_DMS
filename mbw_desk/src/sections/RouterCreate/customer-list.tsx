import React, { useContext, useEffect } from 'react'
import { CustomerType } from './type'
import type { ColumnsType } from 'antd/es/table'
import { baseCustomers, commonColumnCustomer, commonTable, optionsFrequency } from './data'
import { TableCustom } from '../../components'
import {DeleteOutlined} from '@ant-design/icons'
import { Select, Table } from 'antd'
import { CustomerContext } from './view'
import { GlobalContext } from '@/App'

export default function CustomerList({search}: {search:string}) {
    const {setCustomerRouter,customerRouter,refCustomer} = useContext(CustomerContext)

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
                    setCustomerRouter((prev:any) => {                        
                        return prev.map((customer:CustomerType) => {
                            if(customer.customer_code == record.customer_code) {
                                customer['frequency'] = frequency.toString().replaceAll(",",";")
                            }
                            return customer
                        })
                    })
                }}
                defaultValue={value.split(';')}
                />
            }
        },{
            title: "Hành động",
            dataIndex: "",
            key: "action",
            render: (_:any,customer:CustomerType) => {
                return <div className='flex justify-center' onClick={() => {
                    setCustomerRouter((prev:any[]) => {
                        return [...prev.filter((cs) => cs.customer_code != customer.customer_code )]
                    })
                }}><DeleteOutlined /></div>
            }
        },
    
    ] 

    
  return (
    <div className=''>
    <TableCustom 
        $wrap={true}
        columns={columnsCustomer}
        dataSource={customerRouter.filter((cus: CustomerType) => 
            cus.customer_name?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase()) || cus.customer_code?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase()))}
        pagination={false}
    />
    </div>
  )
}
 
