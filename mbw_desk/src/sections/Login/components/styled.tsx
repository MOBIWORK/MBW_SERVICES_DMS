import { Input, Select } from "antd";
import styled from "styled-components";


export const SelectLanguage = styled(Select)`
width: 160px;
heigh: 28px;
`

export const InputLogin = styled(Input)`
& ,& input, & .ant-input-affix-wrapper {
    background: #F4F6F8!important;
}

& input:not(:placeholder-shown) {
    background: #F4F6F8!important;
}

&:hover ,&:focus-within{
    border-color: #d9d9d9!important;
}

`

export const InputLoginPw = styled(Input.Password)`
& ,& input, & .ant-input-affix-wrapper {
    background: #F4F6F8!important;
}

& input:not(:placeholder-shown) {
    background: #F4F6F8!important;
}

&:hover ,&:focus-within {
    border-color: #d9d9d9!important;
}

&.ant-input-affix-wrapper.ant-input-password {
    background: #F4F6F8!important;
}
`