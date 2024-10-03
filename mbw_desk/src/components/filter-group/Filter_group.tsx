/** @format */
import {
  MonthFilter,
  YearFilter,
  SaleGroupFilter,
  EmployeeFilter,
  FromDateFilter,
  ToDateFilter,
  SupplierFilter,
  IndustryFilter,
  BrandFilter,
} from "./filter-items";

interface Filter_groupProps {
  setPage: (value: number) => void;

  inputMonth?: boolean;
  inputYear?: boolean;
  inputFromDate?: boolean;
  inputToDate?: boolean;
  inputSaleGroup?: boolean;
  inputEmployee?: boolean;
  inputSupplier?: boolean;
  inputIndustry?: boolean;
  inpitBrand?: boolean;
}
const Filter_group = ({
  setPage,
  inputMonth,
  inputYear,
  inputFromDate,
  inputToDate,
  inputSaleGroup,
  inputEmployee,
  inputSupplier,
  inputIndustry,
  inpitBrand,
}: Filter_groupProps) => {
  return (
    <>
      {inputMonth && <MonthFilter setPage={setPage} />}
      {inputYear && <YearFilter />}
      {inputFromDate && <FromDateFilter />}
      {inputToDate && <ToDateFilter />}
      {inputSaleGroup && <SaleGroupFilter />}

      {inputEmployee && <EmployeeFilter setPage={setPage} />}

      {inputSupplier && <SupplierFilter setPage={setPage} />}
      {inputIndustry && <IndustryFilter setPage={setPage} />}
      {inpitBrand && <BrandFilter setPage={setPage} />}
    </>
  );
};

export default Filter_group;
