/** @format */

import { Table } from "antd";
const SummaryDataReportSaleOrder = ({
  SummaryData,
}: {
  SummaryData: any[];
}) => {
  return (
    <Table.Summary.Row>
      <Table.Summary.Cell
        index={0}
        className="!border-r-0"></Table.Summary.Cell>
      <Table.Summary.Cell index={1}></Table.Summary.Cell>
      <Table.Summary.Cell index={2}>Tổng</Table.Summary.Cell>
      <Table.Summary.Cell index={3}></Table.Summary.Cell>
      <Table.Summary.Cell index={5}></Table.Summary.Cell>
      <Table.Summary.Cell index={6}></Table.Summary.Cell>
      <Table.Summary.Cell index={7}></Table.Summary.Cell>
      <Table.Summary.Cell index={8}>
        <div className="text-right">
          {Intl.NumberFormat().format(SummaryData?.sum_total || 0)}
        </div>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={9}>
        <div className="text-right">
          {Intl.NumberFormat().format(SummaryData?.sum_vat || 0)}
        </div>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={10}>
        <div className="text-right">
          {Intl.NumberFormat().format(SummaryData?.sum_discount_amount || 0)}
        </div>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={11}>
        <div className="text-right">
          {Intl.NumberFormat().format(SummaryData?.sum_grand_total || 0)}
        </div>
      </Table.Summary.Cell>
    </Table.Summary.Row>
  );
};

export default SummaryDataReportSaleOrder;
