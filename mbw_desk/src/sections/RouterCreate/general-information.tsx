import React from 'react'
import { FormItemCustom } from '../../components/form-item/form-item';
import { Col, DatePicker, Input, Select } from 'antd';
import RowCustom from './styled';
import { statusOption } from './data';

export default function GeneralInformation() {
    return (
        <>
            <RowCustom >
                <Col span={12}>
                    <FormItemCustom label="Mã tuyến" name="channel_code">
                        <Input />
                    </FormItemCustom>
                </Col>
                <Col span={12}>
                    <FormItemCustom label="Tên tuyến" name="channel_name">
                        <Input />
                    </FormItemCustom>
                </Col>
            </RowCustom>
            <RowCustom >
                <Col span={12}>
                    <FormItemCustom label="Team sale" name="team_sale">
                        <Select showSearch/>
                    </FormItemCustom>
                </Col>
                <Col span={12}>
                    <FormItemCustom label="Nhân viên" name="employee">
                        <Select showSearch/>
                    </FormItemCustom>
                </Col>
            </RowCustom>
            <RowCustom>
                <Col span={12}>
                    <FormItemCustom label="Ngày đi tuyến" name="travel_date">
                        <DatePicker/>
                    </FormItemCustom>
                </Col>
                <Col span={12}>
                    <FormItemCustom label="Trạng thái" name="status">
                        <Select options={statusOption} defaultValue={'Active'}/>
                    </FormItemCustom>
                </Col>
            </RowCustom>
        </>
    )
}
