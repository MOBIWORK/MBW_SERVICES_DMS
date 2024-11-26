/** @format */

import "dayjs/locale/vi";
import dayjs from "dayjs";
import  utc from "dayjs/plugin/utc"

import timezone from "dayjs/plugin/timezone";
import { Modal, message } from "antd";
import { ReactNode } from "react";
import { saveAs } from "file-saver";
import { AxiosService } from "@/services/server";
export const infoToast = (text: string | ReactNode) => {
  message.info(text);
};

export const errorToast = (text: string | ReactNode) => {
  message.error(text);
};

export const successToast = (text: string | ReactNode) => {
  message.success(text);
};

export const modalMessage = (title: string = "", content: string = "") => {
  const [modal] = Modal.useModal();
  const info = modal.info({
    title,
    content,
  });

  setTimeout(() => {
    info.destroy();
  }, 1000);
};

export const getAttrInArray = (array: any[], fields: any[], options = {}) => {
  let newArray: any[] = [];
  array.forEach((data) => {
    let obj = {};
    for (let key in data) {
      if (fields.includes(key)) {
        obj[key] = data[key];
      }
    }
    if (options.isNull) {
      newArray.push(obj);
    } else {
      let checkNull = Object.keys(obj).find((key) => !obj[key]);
      if (!checkNull) newArray.push(obj);
    }
  });
  return newArray;
};

interface treeArrayProps {
  data: any[];
  parentField?: string;
  parentValue?: null | any;
  keyValue: string;
}
export const treeArray = ({
  data = [],
  parentField = "",
  parentValue = null,
  keyValue = "",
}: treeArrayProps): any[] => {
  if (data.length == 0) return data;
  // let arr = data.filter(element => (element[parentField] == parentValue))
  let arr = data.filter(
    (element) =>
      element[parentField] == parentValue ||
      (!parentValue &&
        !data.find((ele) => ele[keyValue] == element[parentField]))
  );
  return arr.map((element: any[]) => {
    return {
      ...element,
      children: treeArray({
        data: data.filter(
          (element) =>
            element[parentField] !== parentValue &&
            (parentValue ||
              data.find((ele) => ele[keyValue] == element[parentField]))
        ),
        parentField,
        parentValue: element[keyValue as any] as string,
        keyValue,
      }),
    };
  });
};

/**
 
[
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'my leaf',
          },
          {
            value: 'leaf2',
            title: 'your leaf',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'sss',
            title: <b style={{ color: '#08c' }}>sss</b>,
          },
        ],
      },
    ],
  },
];
 */
dayjs.locale("vi");
export const arrayDays = (
  startTime: string | number | Date,
  endTime: string | number | Date
) => {
  const dateObjects = [];
  let currentDate = dayjs(startTime);

  while (currentDate.isBefore(endTime) || currentDate.isSame(endTime, "day")) {
    dateObjects.push({
      date: currentDate.format("DD/MM/YYYY"),
      dayOfWeek: currentDate.format("dddd"),
    });
    currentDate = currentDate.add(1, "day");
  }
  console.log("dateObjects", dateObjects);

  return dateObjects;
};

export const tmpToTimeZone = (day: string) => {
  // Output: 202
  return dayjs
    .unix(Number.parseFloat(day) / 1000)
    .format("YYYY-MM-DDTHH:mm:ss");
};

export const TodayLimit = (day: any) => {
  const today = new Date(day).setHours(0, 0, 0).toString();
  const nextday = new Date(day).setHours(24, 0, 0).toString();
  console.log({ today, nextday });

  return { today, nextday };
};

export const ExportExcel = (query: any) => {
  const params = new URLSearchParams(query);
  window.location.href =
    (import.meta.env.VITE_BASE_URL || "") +
    `/api/method/frappe.core.doctype.data_import.data_import.download_template?${params.toString()}`;
};

export const translationUrl = (url: string) => {
  window.location.href = url;
};

interface downloadProps {
  url: string;
  params: any;
  file_name?: string;
}
export const handleDowload = async (
  { url, params, file_name = "report.xlsx" }: downloadProps,
  setIsExcel: (value: boolean) => void
) => {
  try {
    // console.log(params);
    setIsExcel(true);
    const response = await AxiosService.get(url, {
      params,
      responseType: "arraybuffer",
    });
    const blob = new Blob([response]);
    console.log(blob);

    saveAs(blob, file_name);
  } catch (err) {
    console.log("error", err);
  } finally {
    setIsExcel(false);
  }
};

export const getDaysAndWeekdays = (
  startTimestamp: number,
  endTimestamp: number
) => {
  // Chuyển đổi timestamp thành đối tượng Date
  const startDate = new Date(startTimestamp * 1000); // timestamp theo giây, cần nhân với 1000 để chuyển thành mili giây
  const endDate = new Date(endTimestamp * 1000); // tương tự cho ngày kết thúc

  // Kiểm tra nếu ngày kết thúc nhỏ hơn ngày bắt đầu
  if (startDate > endDate) return [];

  const daysArray = [];
  const dayweek = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

  // Duyệt qua từng ngày từ ngày bắt đầu đến ngày kết thúc
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay(); // Lấy thứ của ngày hiện tại
    daysArray.push({
      date: d.getDate(), // Lấy ngày trong tháng
      dayOfWeek: dayweek[dayOfWeek], // Lấy thứ trong tuần
    });
  }

  return daysArray;
};


 // trả về bool hôm nay
 export function isToday(timestamp:number) {
  const timeZone = "Asia/Saigon";
  const date = new Date(timestamp).toLocaleDateString("en-US", {
    timeZone: timeZone,
  });
  const today = new Date().toLocaleDateString("en-US", {
    timeZone: timeZone,
  });
  return date === today;
}

export async function reverseGeocode(position:number[],ekmapplf:any,_options:any):Promise<string> {
  return new Promise((resolve, reject) => {
    const param = {
      "point.lon": position[0],
      "point.lat": position[1],
    };
    const geocoding = new ekmapplf.service.Geocoding(_options.apiKey);
    geocoding.reverse(param, (error, response) => {
      if (error) {
        reject("Không có thông tin");
      } else {
        const address =
          response.results.length > 0
            ? response.results[0].formatted_address
            : "Không có thông tin";
        resolve(address);
      }
    });
  });
}





interface choooseProp {
  objectIn: { [key: string]: any };
  keys: string[];
}
export const chooseKey = ({ objectIn = {}, keys = [] }: choooseProp) => {
  let ObjOut: { [key: string]: any } = {};
  for (let key in objectIn) {
    if (keys.includes(key)) {
      ObjOut[key] = objectIn[key];
    }
  }

  return ObjOut;
};

const getListUnit = (datas: any) => {
  return datas.map((data: any) => {
    return {
      uom: data.choice_values,
    };
  });
};

const transformData = (inputData: any[]) => {
  const transformProduct = (product: any) => {
    return {
      name: product._id,
      so_luong: product.so_luong,
      unit: product.list_dvt.map((dvt: any) => ({
        uom: dvt.choice_values,
        conversion_factor: getConversionFactor(dvt.choice_values),
      })),
      stock_uom: "Nos",
      item_code: product.ma_san_pham,
      item_name: product.ten_san_pham,
      item_group: "Products",
      description: product.ten_san_pham,
    };
  };

  const getConversionFactor = (uom: string) => {
    switch (uom) {
      case "Box":
        return 5;
      case "Calibre":
        return 10;
      default:
        return 1;
    }
  };

  // Chuyển đổi thành mảng các sản phẩm
  return inputData.map((data) => ({
    khuyen_mai: data?.khuyen_mai,
    yeu_cau: data.yeu_cau,
    san_pham_mua: data.san_pham_mua.map(transformProduct),
    san_pham_khuyen_mai: data.san_pham_khuyen_mai.map((group: any[]) =>
      group.map(transformProduct)
    ),
  }));
};

export const transformDataPromotion = (
  dataPromotion: any,
  typePromotion: String
) => {
  switch (typePromotion) {
    case "SP_SL_CKSP":
      const promotion1 = dataPromotion?.map((prod: any) => {
        return {
          unit: getListUnit(prod.don_vi_tinh_other),
          so_luong: prod.yeu_cau,
          qty_min: prod.yeu_cau_min,
          khuyen_mai: prod.khuyen_mai,
          name: prod._id,
          item_code: prod.ma_san_pham,
          item_name: prod.ten_san_pham,
          stock_uom: prod.don_vi_tinh.choice_values,
        };
      });

      return promotion1;
    case "SP_SL_SP":
      const promotion_2 = dataPromotion?.map((prod: any) => {
        const khuyen_mai = prod.khuyen_mai?.map((km: any) => {
          const list_dvt_km = km.don_vi_tinh_other?.map((dvt: any) => {
            return { uom: dvt.choice_values };
          });
          return {
            item_code: km.ma_san_pham,
            item_name: km.ten_san_pham,
            name: km._id,
            stock_uom: km.don_vi_tinh.choice_values,
            so_luong: km.so_luong,
            unit: list_dvt_km,
          };
        });

        return {
          item_code: prod.ma_san_pham,
          item_name: prod.ten_san_pham,
          name: prod._id,
          so_luong: prod.yeu_cau,
          unit: getListUnit(prod?.don_vi_tinh_other),
          khuyen_mai,
          stock_uom: prod.don_vi_tinh.choice_values,
        };
      });

      return promotion_2;

    case "SP_SL_TIEN":
      const promotion3 = dataPromotion?.map((prod: any) => {
        return {
          name: prod._id,
          item_code: prod.ma_san_pham,
          item_name: prod.ten_san_pham,
          stock_uom: prod.don_vi_tinh.choice_values,
          so_luong: prod.yeu_cau,
          qty_min: prod.yeu_cau_min,
          khuyen_mai: prod.khuyen_mai,
          unit: getListUnit(prod?.don_vi_tinh_other),
        };
      });
      return promotion3;

    case "SP_ST_CKSP":
    case "SP_ST_TIEN":
      const promotion4 = dataPromotion?.map((prod: any) => {
        return {
          name: prod._id,
          item_code: prod.ma_san_pham,
          item_name: prod.ten_san_pham,
          stock_uom: prod.don_vi_tinh.choice_values,
          yeu_cau: prod.yeu_cau,
          qty_min: prod.yeu_cau_min,
          khuyen_mai: prod.khuyen_mai,
          unit: getListUnit(prod?.don_vi_tinh_other),
        };
      });
      return promotion4;

    case "SP_ST_SP":
      const promotion_5 = dataPromotion?.map((prod: any) => {
        const khuyen_mai = prod.khuyen_mai?.map((km: any) => {
          const list_dvt_km = km.don_vi_tinh_other?.map((dvt: any) => {
            return { uom: dvt.choice_values };
          });
          return {
            item_code: km.ma_san_pham,
            item_name: km.ten_san_pham,
            name: km._id,
            stock_uom: km.don_vi_tinh.choice_values,
            so_luong: km.so_luong,
            unit: list_dvt_km,
          };
        });

        return {
          item_code: prod.ma_san_pham,
          item_name: prod.ten_san_pham,
          name: prod._id,
          yeu_cau: prod.yeu_cau,
          unit: getListUnit(prod?.don_vi_tinh_other),
          khuyen_mai,
          stock_uom: prod.don_vi_tinh.choice_values,
        };
      });

      return promotion_5;
    case "TIEN_SP":
      const promotion_6 = dataPromotion?.map((prod: any) => {
        const khuyen_mai = prod.khuyen_mai?.map((km: any) => {
          const list_dvt_km = km.don_vi_tinh_other?.map((dvt: any) => {
            return { uom: dvt.choice_values };
          });
          return {
            item_code: km.ma_san_pham,
            item_name: km.ten_san_pham,
            name: km._id,
            stock_uom: km.don_vi_tinh.choice_values,
            so_luong: km.so_luong,
            unit: list_dvt_km,
          };
        });
        return {
          khuyen_mai,
          yeu_cau: prod.yeu_cau,
        };
      });
      return promotion_6;
    case "TIEN_CKDH":
    case "TIEN_TIEN":
      return dataPromotion;

    //========================= CTKM Muti====================== //

    case "MUTI_SP_ST_SP": //2.1
    case "MUTI_SP_ST_CKSP": //2.2
    case "MUTI_SP_ST_TIEN": //2.3
    case "MUTI_SP_SL_SP": //2.4
    case "MUTI_SP_SL_CKSP": //2.5
    case "MUTI_SP_SL_TIEN": //2.6
    case "MUTI_TIEN_SP": //2.7
    case "MUTI_TIEN_CKDH": //2.8
    case "MUTI_TIEN_TIEN": //2.9
      const promotion_multi = transformData(dataPromotion);
      return promotion_multi;

    default:
      return [];
  }
};

export const sortedData = (data: any) => {
  return data.sort((a: any, b: any) => {
    const isANumeric = /^\d/.test(a.value);
    const isBNumeric = /^\d/.test(b.value);

    if (isANumeric && !isBNumeric) {
      return 1; // Move `a` (numeric) to the bottom
    } else if (!isANumeric && isBNumeric) {
      return -1; // Keep `b` (numeric) below `a` (non-numeric)
    } else {
      return a.value.localeCompare(b.value); // Normal alphabetical sorting
    }
  });
};



export const returnTimeDays=({
  timestamp, typeDay="second"
}:any) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  if(typeDay == "second") {
    timestamp *=1000
  }
  const timeZone = "Asia/Ho_Chi_Minh";
  let time_daye = dayjs.utc(timestamp).tz(timeZone)
  let from_date = time_daye.set("hour",0).set("minutes",0).set("seconds",0).valueOf()/1000
  let to_date = time_daye.set("hour",23).set("minutes",59).set("seconds",59).valueOf()/1000
  return {
    from_date,to_date
  }
}