import { Form } from 'antd'
import React from 'react'
import styled from 'styled-components'

export const FormItemCustom = styled(Form.Item)<{ disabled?: boolean }>`
&.ant-form-item {
  margin-bottom: 0;
  line-height: normal;
}



& .ant-form-item-label {
  & > label {
    color: black;
    font-weight: 500;
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

& input:empty, & .ant-select-selector {
  background-color: #F5F7FA!important;
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
