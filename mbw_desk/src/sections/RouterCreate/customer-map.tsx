import React from 'react'
import { CustomerType } from './type'
import { Col, Row } from 'antd'
import { TableCustom } from '../../components'
import { baseCustomers, commonTable } from './data'

type Props = {
    data?: CustomerType[] | false
}
export default function CustomerMap({data}:Props) {
  return (
    <Row>
      <Col>
      <TableCustom 
        bordered={false}
        columns={commonTable}
        dataSource={baseCustomers}
        pagination={false}
    />
      </Col>
      <Col>
        Map
      </Col>
    </Row>
  )
}
