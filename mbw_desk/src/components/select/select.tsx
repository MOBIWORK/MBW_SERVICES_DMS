import { Select, TreeSelect } from "antd";
import styled from "styled-components";


export const SelectCommon = styled(Select)`
&.ant-select-single {
    height: fit-content!important;
    border-radius: 8px !important;
    width:100%!important;
}
overflow: hidden;
max-width:100%!important;

    & .ant-select-selector {
        background: #F5F7FA !important;
        border-radius: 8px !important;
        height: 28px!important;
    }
`


export const TreeSelectCommon = styled(TreeSelect)`
    height: 29px!important;
    width:100%!important;
    max-width:100%!important;
    & .ant-select-selector {
        background: #F5F7FA !important;
        border-radius: 8px !important;
    }
`