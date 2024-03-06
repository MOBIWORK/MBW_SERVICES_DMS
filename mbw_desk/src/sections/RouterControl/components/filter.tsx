import { Button, Col, Form, Row } from 'antd'
import React from 'react'
import { FormItemCustom, SelectCommon } from '../../../components'
import { DatePick } from '../../../components/date-picker/date-picker'
import { useForm } from 'antd/lib/form/Form'


interface filterProps {
    action?: any,
    form: any
}
export default function Filter({ action, form }: filterProps) {
    return (
        <Form form={form} onFinish={action} layout='vertical' className='w-[419px]'>
            <FormItemCustom label="Ngày tạo" name={"creation"}>
                <DatePick format={"DD-MM-YYYY"} />
            </FormItemCustom>
            <FormItemCustom label="Người tạo" name="owner">
                <SelectCommon />
            </FormItemCustom>
            <FormItemCustom label="Ngày cập nhật" name="modified">
                <DatePick format={"DD-MM-YYYY"} />
            </FormItemCustom>
            <FormItemCustom label="Người cập nhật" name="modified_by">
                <SelectCommon />
            </FormItemCustom>
            <Row className='justify-end mt-4' gutter={8}>
                <Col>
                    <Button className='bg-[#F4F6F8] border-none' onClick={() => form.resetFields()}>
                        Đặt lại
                    </Button>
                </Col>
                <Col>
                    <Button type="primary" htmlType="submit">
                        Áp dụng
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}
