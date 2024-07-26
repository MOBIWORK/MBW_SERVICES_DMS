import{bm as t,bz as e}from"./index-Kp5XK5c_.js";const n=t(e)`
  & .ant-table-container .ant-table-cell {
    font-size: 14px !important;
    font-weight: 500;
  }
  &.ant-table-wrapper table {
    border-radius: 16px !important;
  }

  & .ant-table-thead {
    & > tr {
      & .ant-table-cell {
        color: #637381;
        line-height: 21px;
        font-size: 14px;
        font-weight: 500 !important;
      }
      border-radius: 16px 16px 0 0 !important;
      & th {
        white-space: nowrap;
        border-bottom: none;
      }
      & th:first-child {
        border-start-start-radius: 16px !important;
      }

      & th:last-child {
        border-start-end-radius: 16px !important;
      }
    }
  }

  & .ant-table-tbody > tr:last-child {
    border-radius: 0 0 16px 16px !important;
    & td:first-child {
      border-end-start-radius: 16px !important;
    }

    & td:last-child {
      border-end-end-radius: 16px !important;
    }
  }

  .ant-table-container {
    table {
    }

    .ant-table-thead {
      
    
      .ant-table-cell {
        background: #fff;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.12em;
        color: #8094ae;
        border-bottom: 1px solid #ebebeb;
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
          color: #565f6b;
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
            color: #2c3137;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            padding-inline-end: 24px;
          }
        }

        .ant-select-arrow {
          color: #707c8c;
        }
      }
    }

    .ant-pagination-total-text {
      color: #565f6b;
      margin-right: 1.5rem;
    }

    .ant-pagination-item {
      font-weight: 500;
    }
  }
`;export{n as T};
