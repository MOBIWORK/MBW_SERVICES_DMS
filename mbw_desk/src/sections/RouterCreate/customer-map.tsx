import React ,{useState,useEffect}from 'react'
import { CustomerType } from './type'
import { Col, Row } from 'antd'
import { TableCustom } from '../../components'
import { baseCustomers, commonTable } from './data'
import {  Mapcustom } from '../../components/map/map'
import {locations} from '../../types/location'
import {getAttrInArray} from "../../util"

type Props = {
    data?: CustomerType[] | false
}
export default function CustomerMap({data}:Props) { 
  const [locations,setLocation] = useState<locations[]>([])
  useEffect(()=> {
    setLocation(getAttrInArray(data,["customer_name","longitude","longitude"], {isNull: false}))
  },[data])
  return (
    <>
      <Row className='h-[500px]'>
        <Col span={8}>
        <TableCustom 
          columns={[{
            title: "Stt",
            dataIndex: "stt",
            key: "stt",
            render: (_,record,index) => index +1
        },...commonTable]
      }
          dataSource={data}
          pagination={false}
      />
        </Col>
        <Col span={16} className="overflow-hidden">
          <Mapcustom locations={locations}/>
        </Col>
      </Row>
    </>
  )
}
