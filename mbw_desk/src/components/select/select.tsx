/** @format */

import useDebounce from "@/hooks/useDebount";
import { AxiosService } from "@/services/server";
import { Select, TreeSelect } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const SelectCommon = styled(Select)<{ $h?: number }>`
  & .ant-select-selection-placeholder {
    z-index: 100;
  }
  &.ant-select-single {
    height: fit-content !important;
    border-radius: 8px !important;
    width: 100% !important;
  }
  overflow: hidden;
  max-width: 100% !important;

  & .ant-select-selector {
    background: #f5f7fa !important;
    border-radius: 8px !important;
    height: ${(props) => props.$h || 28}px!important;
  }
`;

export const TreeSelectCommon = styled(TreeSelect)`
  height: 29px !important;
  width: 100% !important;
  max-width: 100% !important;
  & .ant-select-selector {
    background: #f5f7fa !important;
    border-radius: 8px !important;
  }
  & .ant-select-selection-placeholder {
    z-index: 100;
  }
`;


export const SelectSearch =({option,setOption,doc,reference}:any) => {
  const [options,setOptions] = useState([])
  const [key,setKey] = useState("")
  const keys = useDebounce(key)
  useEffect(() => {

    (async() => {
      const searchSup = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keys,
            doctype: doc,
            ignore_user_permissions: 0,
            reference_doctype: reference,
          },
        }
      );

      setOptions(searchSup.message.map((data:any) =>({value:data.value,label: data.value})))
    })()
  },[keys])

  return <SelectCommon options={options} showSearch allowClear  onSearch={setKey} value={option} onSelect={setOption} onClear={() =>setOption("")}/>


}