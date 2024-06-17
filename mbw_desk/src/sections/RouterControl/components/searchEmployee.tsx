import { FormItemCustom, SelectCommon } from '@/components';
import useDebounce from '@/hooks/useDebount';
import { AxiosService } from '@/services/server';
import { employee } from '@/types/employeeFilter';
import { rsDataFrappe } from '@/types/response';
import { Select, Spin } from 'antd';
import React, { useEffect, useLayoutEffect, useState } from 'react'

interface Props {
    setEmployee: any,
    employee?: string,
    isdeletedField: boolean,
    team_sale?: string
}

function SearchEmployee({ setEmployee, employee, isdeletedField, team_sale }: Props) {
    const [listEmployees, setListEmployees] = useState<any[]>([]);
    const [keySearch4, setKeySearch4] = useState("");
    let seachbykey = useDebounce(keySearch4);
    const [fetching, setFetching] = useState(false);

    useLayoutEffect(() => {
        (async () => {
            setFetching(true)
            let rsEmployee: rsDataFrappe<employee[]> = await AxiosService.get(
                "/api/method/mbw_dms.api.router.get_sale_person",
                {
                    params: {
                        team_sale: team_sale,
                        key_search: seachbykey,
                    },
                }
            );
            let { message: results } = rsEmployee;
            setListEmployees(
                results.map((employee_filter: employee) => ({
                    value: employee_filter.employee_code,
                    label: employee_filter.employee_name || employee_filter.employee_code,
                }))
            );
            setFetching(false)
        })();
    }, [team_sale, seachbykey]);
    
    return (
        <SelectCommon
            showSearch
            onSearch={setKeySearch4}
            placeholder="Nhân viên chăm sóc"
            options={listEmployees}
            allowClear
            onChange={(value) => {
                setEmployee(value);
            }}
            value={employee}
            className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
            dropdownStyle={{
                maxHeight: 400,
                overflow: "auto",
                minWidth: 300,
            }}

            filterOption={false}
            notFoundContent={fetching ? <Spin size="small" /> : null}
        />
    )
}

export default SearchEmployee
