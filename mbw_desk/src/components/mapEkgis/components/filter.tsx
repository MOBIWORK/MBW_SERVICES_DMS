import { FormItemCustom } from '@/components/form-item'
import { SelectCommon } from '@/components/select/select'
import { Col, Form, Row } from 'antd'
import React from 'react'

interface Props {}

function Filter() {

    return (
        <Form layout='vertical' className='w-[500px] text-[12px]'>
            {/* #1  */}
            <Row gutter={16}>
                <Col span={12}>
                    <FormItemCustom label="Phòng ban">
                        <SelectCommon />
                    </FormItemCustom>
                </Col>
                <Col span={12}>
                    <FormItemCustom label="Sắp xếp">
                        <SelectCommon />
                    </FormItemCustom>
                </Col>
            </Row>
            {/* #2  */}
            <Row gutter={16}>
                <Col span={12}>
                    <FormItemCustom label="Chỉ tiêu">
                        <SelectCommon />
                    </FormItemCustom>
                </Col>
                <Col span={12}>
                    <FormItemCustom label="Đơn hàng">
                        <SelectCommon />
                    </FormItemCustom>
                </Col>
            </Row>
            {/* #3  */}
            <Row gutter={16}>
                <Col span={12}>
                    <FormItemCustom label="Viếng thăm">
                        <SelectCommon />
                    </FormItemCustom>
                </Col>
                <Col span={12}>
                    <FormItemCustom label="Chỉ tiêu theo ngày">
                        <SelectCommon />
                    </FormItemCustom>
                </Col>
            </Row>
        </Form>
    )
}

export default Filter
