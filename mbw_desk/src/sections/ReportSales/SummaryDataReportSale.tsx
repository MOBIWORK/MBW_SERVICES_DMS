/** @format */

import { Table } from "antd";
const SummaryDataReportSale = ({ summaryData }: { summaryData?: any[] }) => {
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
          {Intl.NumberFormat().format(summaryData?.sum_total)}
        </div>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={9}>
        <div className="text-right">
          {Intl.NumberFormat().format(summaryData?.sum_vat)}
        </div>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={10}>
        <div className="text-right">
          {Intl.NumberFormat().format(summaryData?.sum_discount_amount)}
        </div>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={11}>
        <div className="text-right">
          {Intl.NumberFormat().format(summaryData?.sum_grand_total)}
        </div>
      </Table.Summary.Cell>
    </Table.Summary.Row>
  );
};

export default SummaryDataReportSale;
