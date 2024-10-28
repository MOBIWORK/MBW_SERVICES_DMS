/** @format */

import { Table } from "antd";
const SummaryFooter = ({ summaryData }: { summaryData: any[] }) => {
  return (
    <Table.Summary.Row>
      <Table.Summary.Cell index={0}></Table.Summary.Cell>
      <Table.Summary.Cell index={1}>Tổng</Table.Summary.Cell>
      <Table.Summary.Cell index={2}></Table.Summary.Cell>
      <Table.Summary.Cell index={3}></Table.Summary.Cell>
      <Table.Summary.Cell index={4} className="text-center">
        {summaryData?.tong_kh_vt}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={5} className="text-center">
        {summaryData?.tong_th_vt}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={6}></Table.Summary.Cell>
      <Table.Summary.Cell index={7} className="text-center">
        {summaryData?.tong_kh_vt_dn}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={8} className="text-center">
        {summaryData?.tong_th_vt_dn}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={9}></Table.Summary.Cell>
      <Table.Summary.Cell index={10} className="text-center">
        {summaryData?.tong_kh_dat_hang}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={11} className="text-center">
        {summaryData?.tong_th_dat_hang}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={12}></Table.Summary.Cell>
      <Table.Summary.Cell index={13} className="text-center">
        {summaryData?.tong_kh_kh_moi}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={14} className="text-center">
        {summaryData?.tong_th_kh_moi}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={15}></Table.Summary.Cell>
      <Table.Summary.Cell index={16} className="text-center">
        {summaryData?.tong_kh_don_hang}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={17} className="text-center">
        {summaryData?.tong_th_don_hang}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={18}></Table.Summary.Cell>
      <Table.Summary.Cell index={19} className="text-center">
        {Intl.NumberFormat().format(summaryData?.tong_kh_doanh_so)}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={20} className="text-center">
        {Intl.NumberFormat().format(summaryData?.tong_th_doanh_so)}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={21}></Table.Summary.Cell>
      <Table.Summary.Cell index={22} className="text-center">
        {Intl.NumberFormat().format(summaryData?.tong_kh_doanh_thu)}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={23} className="text-center">
        {Intl.NumberFormat().format(summaryData?.tong_th_doanh_thu)}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={24}></Table.Summary.Cell>
      <Table.Summary.Cell index={25} className="text-center">
        {summaryData?.tong_kh_san_lg}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={26} className="text-center">
        {summaryData?.tong_th_san_lg}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={27}></Table.Summary.Cell>
      <Table.Summary.Cell index={28} className="text-center">
        {summaryData?.tong_kh_sku}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={29} className="text-center">
        {summaryData?.tong_th_sku}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={30}></Table.Summary.Cell>
      <Table.Summary.Cell index={31} className="text-center">
        {summaryData?.tong_kh_so_gio_lam_viec}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={32} className="text-center">
        {Number(summaryData?.tong_th_so_gio_lam_viec).toFixed(2)}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={33}></Table.Summary.Cell>
    </Table.Summary.Row>
  );
};

export default SummaryFooter;
