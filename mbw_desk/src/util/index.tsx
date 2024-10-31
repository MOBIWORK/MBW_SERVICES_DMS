/** @format */

import "dayjs/locale/vi";
import dayjs from "dayjs";
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
export const arrayDays = (startTime, endTime) => {
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
