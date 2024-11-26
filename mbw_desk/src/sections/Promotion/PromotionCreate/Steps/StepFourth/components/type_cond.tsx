/** @format */

import { CustomerGroupPromotion } from "./customer-group";
import { CustomerTypePromotion } from "./customer-type";

import {} from "@/redux/slices/promotion-slice";
import { TerritoryPromotion } from "./territory";
interface Props {
  disableList: boolean;
}

function ConditionComp(props: Props) {
  const { disableList } = props;

  return (
    <>
      <CustomerGroupPromotion
        disable={disableList}
        className="w-full mt-3 max-w-[338px] ml-5  lg:ml-0"
      />

      <CustomerTypePromotion
        disable={disableList}
        className="w-full mt-3 max-w-[338px] ml-5 lg:ml-0"
      />

      <TerritoryPromotion
        disable={disableList}
        className="w-full mt-3 max-w-[338px] ml-5  lg:ml-0"
      />
    </>
  );
}

export default ConditionComp;
