import { ARR_REGIONSTR } from "./AppConst";

export const arr_region = [
  {
    value: "all",
    label: "Cả nước",
  },
  ...JSON.parse(ARR_REGIONSTR).map((item: any) => {
    return {
      ...item,
      value: item.code,
      label: item.name,
    };
  }),
];
