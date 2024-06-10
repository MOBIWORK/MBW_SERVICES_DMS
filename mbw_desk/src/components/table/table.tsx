import { Table } from "antd";
import styled from "styled-components";

export const TableCustom = styled(Table)<{
  $border?: boolean;
  $wrap?: boolean;
}>`
& .ant-table-container .ant-table-tbody tr.ant-table-expanded-row:hover>td.ant-table-cell {
  background: #F4F6F8!important;
}
& .ant-table-container table {
  border-left: ${(props) => (props.$border ? "" : "none")}!important;
  border-right: ${(props) => (props.$border ? "" : "none")}!important;

  & tr.ant-table-expanded-row {
    &>td {
      background: #F4F6F8!important; 
    }
    & .ant-table-content {
    background: #F4F6F8!important;
    z-index:91!important;
    }

    &:hover td.ant-table-cell {
      background: white!important;
    }
  & table {
      border-left: 1px solid #f0f0f0!important;
      border-right: 1px solid #f0f0f0!important;
      background: transparent;
      border-radius: 16px!important;
      &>thead>tr>th {
        background: #DFE3E8!important;
        color: #637381!important;
        &:first-child {
          border-start-start-radius: 16px!important;
          border-start-start: 1!important;
        }
      }
      &>tbody>tr:last-child {
        // background: red;
        &>td:first-child {
          border-end-start-radius: 16px!important;
        }
      
        &>td:last-child {
          border-end-end-radius: 16px!important;
        }
      }

      & .ant-table-tbody tr>td.ant-table-cell {
        background: white!important;
      }
      & .ant-table-tbody tr:hover>td.ant-table-cell-row-hover {
        background: white!important;
      }
    }

    }
    

  } 
}
& .ant-table-container .ant-table-cell{
  font-size: 14px!important;
  font-weight:500;
  letter-spacing: normal!important;
}

& .ant-table-cell {
  white-space: nowrap!important;
}

& tbody .ant-table-cell {
  white-space: ${(props) => (props?.$wrap ? "wrap" : "nowrap")}!important;
}
&:not(:has(.ant-table-cell)) .ant-table-thead {
  &>tr {
    & .ant-table-cell {

      color : #637381;
      line-height: 21px;
      font-size: 14px;
      font-weight: 500!important;
      border-radius: 0 !important;

    }
    // border-radius: 16px 16px 0 0 !important;
    border-radius: 0 !important;
    & th {
      white-space : nowrap;
      border-bottom: none
    }
    & th:first-child {
      border-start-start-radius: 0!important;
      border-start-start: 1!important;
    }
  
    & th:last-child {
      border-start-end-radius: 0!important;
    }
  }
}

& .ant-table-tbody>tr:last-child {
  border-radius:  0 0 16px 16px!important;
  & td:first-child {
    border-end-start-radius: 0!important;
  }

  & td:last-child {
    border-end-end-radius: 0!important;
  }
}
& .ant-table-row-expand-icon-cell {
  padding: 0 16px!important;
  border-inline-end: none!important;
}


.ant-table-container {
    table {
      border: 1px solid #ebebeb;
    }

    .ant-table-thead {
      .ant-table-cell {
        background: #fff;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.12em;
        color: #8094ae;
        padding: 10px!important;
      }
    }
    .ant-table-thead
      > tr
      > th:not(
        :last-child,
        .ant-table-selection-column,
        .ant-table-row-expand-icon-cell,
        [colspan]
      )::before {
      position: unset !important;
    }

    .ant-table-tbody {
      .ant-table-row {
        cursor: pointer;

        .ant-table-cell {
          user-select: none;
        }
      }

      .ant-empty {
        margin-top: 3rem;
        margin-bottom: 2.5rem;

        .ant-empty-image {
          height: 56px;
        }

        .ant-empty-description {
          line-height: 20px;
          color: #565F6B;
        }
      }

      & tr {
        &:hover {
          background-color: transparent !important;
          td {
            background-color: #fff !important;
          }
        }
        &:nth-child(2n + 1) {
          td {
            background: #fff;
          }
        }
      }
    }
  }

  .ant-pagination {
    margin-block: 12px !important;

    .ant-pagination-options {
      position: absolute;
      left: 0;
      margin-left: 0;

      .ant-select {
        .ant-select-selector {
          padding: 6px 12px;
          height: 32px;

          .ant-select-selection-item {
            color: #2C3137;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            padding-inline-end: 24px;
          }
        }

        .ant-select-arrow {
          color: #707C8C;
        }
      }
    }

    .ant-pagination-total-text {
      color: #565F6B;
      margin-right: 1.5rem;
    }

    .ant-pagination-item {
      font-weight: 500;
    }
  }

  & .ant-table-row-expand-icon-cell {
    padding: 16px!important;
  }

  & .ant-table-cell {
    & .ant-table-content {
      padding: 16px 0;
      padding-right: 25px;
      // margin-left: -18px;
    }
  }

  /* bang vuong */
  &.ant-table-wrapper {
    & table {
      border-start-start-radius: 0px!important;
      border-start-end-radius: 0px!important;
    }
    & .ant-table-container table>thead>tr:first-child >*:first-child {
      border-start-start-radius: 0px!important;
    }

    & .ant-table-container table>thead>tr:first-child >*:last-child {
      border-start-start-radius: 0px!important;
    }
  } 



    background: #fff!important;
  
`;
