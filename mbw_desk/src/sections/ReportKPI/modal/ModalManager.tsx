/** @format */

import { ModalDetail } from "../../ReportCheckin/components/ModalCheckin";
import Detailcheckin from "./Detailcheckin";
import Detailchekinfirst from "./Detailchekinfirst";
import DetailOrder from "./DetailOrder";
import DetailCustomer from "./DetailCustomer";
import DetailTotalOrder from "./DetailTotalOrder";
import Detailsales from "./Detailsales";
import Detailrevenue from "./Detailrevenue";
import DetailQty from "./DetailQty";
import DetailSku from "./DetailSku";
import DetailWork from "./DetailWork";

interface CheckinModalProps {
  type: string;
  title: string;
  month: string;
  year: string;
  setModal: (value: any) => void;
  modal: ShowModalProps;
}
interface ShowModalProps {
  open: boolean;
  id: any;
}
const ModalManager = ({
  type,
  month,
  year,
  setModal,
  modal,
  title,
}: CheckinModalProps) => {
  const closeModal = () => {
    setModal({
      open: false,
      id: null,
    });
  };

  const Render = () => {
    if (type == "modalSale") {
      return (
        <Detailsales employee={modal.id?.employee} month={month} year={year} />
      );
    }
    if (type === "modal") {
      return (
        <Detailcheckin
          employee={modal.id?.employee}
          month={month}
          year={year}
        />
      );
    }
    if (type == "modalCheckF") {
      return (
        <Detailchekinfirst
          employee={modal.id?.employee}
          month={month}
          year={year}
        />
      );
    }

    if (type == "modalOder") {
      return (
        <DetailOrder employee={modal.id?.employee} month={month} year={year} />
      );
    }

    if (type == "modalCustomer") {
      return (
        <DetailCustomer
          employee={modal.id?.employee}
          month={month}
          year={year}
        />
      );
    }
    if (type == "modalTotal") {
      return (
        <DetailTotalOrder
          employee={modal.id?.employee}
          month={month}
          year={year}
        />
      );
    }

    if (type == "modalTotal") {
      return (
        <Detailsales employee={modal.id?.employee} month={month} year={year} />
      );
    }

    if (type == "modalReven") {
      return (
        <Detailrevenue
          employee={modal.id?.employee}
          month={month}
          year={year}
        />
      );
    }
    if (type == "modalQty") {
      return (
        <DetailQty employee={modal.id?.employee} month={month} year={year} />
      );
    }
    if (type == "modalSku") {
      return (
        <DetailSku employee={modal.id?.employee} month={month} year={year} />
      );
    }
    if (type == "modalWork") {
      return (
        <DetailWork employee={modal.id?.employee} month={month} year={year} />
      );
    }
  };
  return (
    <ModalDetail
      title={
        <div className="font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4">
          {title} - {modal.id?.name_employee}
        </div>
      }
      open={modal.open}
      onCancel={closeModal}
      footer={false}
      width={1120}>
      <Render />
    </ModalDetail>
  );
};

export default ModalManager;
