import { Form } from "antd";
import React from "react";
import styled from "styled-components";

export const FormItemCustom = styled(Form.Item)<{ disabled?: boolean }>`
&.ant-form-item {
  margin-bottom: 0;
  line-height: normal;
}

& label.ant-form-item-required{
  &::before {
    display: none!important;
  }
    
}

& .ant-form-item-label {
  & > label {
    color: black;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    height: 24px;

    &::before {
      order: 1;
      margin-left: 4px;
    }

    svg {
      order: 2;
    }
  }
}

.custom-select-container {
  position: relative;
  width: 200px;
}

.custom-placeholder {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #bfbfbf;
  pointer-events: none;
  z-index: 1;
}

.custom-select .ant-select-selector {
  height: 100%;
  position: relative;
  background: transparent;
}

.ant-select-selector,.ant-form-item .ant-form-item-control-input,.ant-select-single {
  border-radius: 8px;
  height: 28px!important;
}

& input:empty, & .ant-select-selector {
  background-color: #F5F7FA!important;
}

& .ant-input-affix-wrapper {
  height: 37px;
}
& :where(.css-dev-only-do-not-override-dkbvqv).ant-select-single {
  height: 36px!important;
}

& .ant-picker {
  height: 36px;
}
.ant-form-item-control {
  gap: 4px;
}

.ant-picker {
  width: 100%;
}
}

`;
// ${props =>
//   props.disabled
//     ? css`
//         .ant-form-item-label {
//           & > label {
//             color: ${ColorPalette.CADMIUM_GRAY};
//             cursor: not-allowed;

//             &.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
//               color: ${ColorPalette.CORAL};
//             }
//           }
//         }
//       `
//     : ''}
