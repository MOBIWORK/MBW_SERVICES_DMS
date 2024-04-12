import {useState,useEffect}from 'react'
import { CustomerType } from './type'
import { Col, Row } from 'antd'
import {  commonTable } from './data'
import {  Mapcustom ,TableCustom} from '@/components'
import {locationType} from '@/types/location'
import {getAttrInArray} from "@/util"

type Props = {
    data?: CustomerType[] | false
}
export default function CustomerMap({data}:Props) { 
  const [locations,setLocation] = useState<locationType[]>([])
  const [focusLocation,setFocusLocation] = useState<locationType >()
  useEffect(()=> {
    setLocation(getAttrInArray(data,["customer_name","long","lat"], {isNull: false}))
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
          onRow={(record, rowIndex) => {
            return {onClick:(event) => {
              console.log(record);
              
              setFocusLocation({
                lat:record.lat,
                long:record.long,
                customer_name:record.customer_name,
              })
            }}
          }}
      />
        </Col>
        <Col span={16} className="overflow-hidden">
          <Mapcustom locations={locations} focusLocation={focusLocation}/>
        </Col>
      </Row>
    </>
  )
}
