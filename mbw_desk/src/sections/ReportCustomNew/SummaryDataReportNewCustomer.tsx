/** @format */

import { Table } from "antd";
const SummaryDataReportNewCustomer = ({
  summaryData,
}: {
  summaryData: any[];
}) => {
  return (
    <Table.Summary.Row>
      <Table.Summary.Cell index={0}></Table.Summary.Cell>
      <Table.Summary.Cell index={1}>Tổng</Table.Summary.Cell>
      <Table.Summary.Cell index={2}></Table.Summary.Cell>
      <Table.Summary.Cell index={3}></Table.Summary.Cell>
      <Table.Summary.Cell index={4}></Table.Summary.Cell>
      <Table.Summary.Cell index={5}></Table.Summary.Cell>
      <Table.Summary.Cell index={6}></Table.Summary.Cell>
      <Table.Summary.Cell index={7}></Table.Summary.Cell>
      <Table.Summary.Cell index={8}></Table.Summary.Cell>
      <Table.Summary.Cell index={9}></Table.Summary.Cell>
      <Table.Summary.Cell index={10}></Table.Summary.Cell>
      <Table.Summary.Cell index={11}></Table.Summary.Cell>
      <Table.Summary.Cell index={12}></Table.Summary.Cell>
      <Table.Summary.Cell index={13}></Table.Summary.Cell>
      <Table.Summary.Cell index={14}></Table.Summary.Cell>
      <Table.Summary.Cell index={15}>
        <div className="text-right">{summaryData?.sum_checkin}</div>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={16}></Table.Summary.Cell>
      <Table.Summary.Cell index={17}></Table.Summary.Cell>
      <Table.Summary.Cell index={18}>
        <div className="text-right">{summaryData?.sum_so}</div>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={19}></Table.Summary.Cell>
    </Table.Summary.Row>
  );
};

export default SummaryDataReportNewCustomer;
