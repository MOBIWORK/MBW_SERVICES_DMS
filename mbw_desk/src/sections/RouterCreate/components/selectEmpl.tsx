import useDebounce from '@/hooks/useDebount';
import { AxiosService } from '@/services/server';
import { employee } from '@/types/employeeFilter';
import { rsDataFrappe } from '@/types/response';
import { Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react'

interface Props {}

function SelectEmpl({teamSale,callback,defaultValue}: {teamSale: string,callback:any,defaultValue:string}) {
    const [keySearch, setKeySearch] = useState("");
    const [employee,setEmployee] = useState<string | undefined>()
    let seachbykey = useDebounce(keySearch);
    const [listEmployees, setListEmployees] = useState<any[]>([]);
    const [fetching, setFetching] = useState(false);
    function changeEmployee(value: string|undefined){
        setEmployee(value)
        callback(value)
    }
    useEffect(() => {
        (async () => {
          setFetching(true)
          try {
            let rsEmployee: rsDataFrappe<employee[]> = await AxiosService.get(
              "/api/method/mbw_dms.api.router.get_sale_person",
              {
                params: {
                  team_sale: teamSale,
                  key_search: seachbykey,
                },
              }
            );
            let { message: results } = rsEmployee;
            setListEmployees(
              results.map((employee_filter: employee) => ({
                value: employee_filter.employee_code,
                label:
                  employee_filter.employee_name || employee_filter.employee_code,
              }))
            );
          } catch (error) {}
          setFetching(false)
        })();
      }, [teamSale, seachbykey]);
      useEffect(() => {
        setEmployee(undefined)
      },[teamSale])
      useEffect(() => {setEmployee(defaultValue)},[defaultValue])
    return (
        <Select
            showSearch
            value={employee}
            onChange={changeEmployee}
            onSearch={setKeySearch}
            options={(() => {
            console.log("ds nhân viên",listEmployees);
            
            return listEmployees
            })()}
            allowClear
            filterOption={false}
            notFoundContent={fetching ? <Spin size="small" /> : null}
      />
    )
}

export default SelectEmpl
