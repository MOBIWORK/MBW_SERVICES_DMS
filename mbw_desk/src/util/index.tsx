import 'dayjs/locale/vi';
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import {Modal, message} from 'antd'
import { ReactNode } from 'react';

export const infoToast = (text:string|ReactNode) => {  
  message.info(text)
}


export const errorToast = (text:string|ReactNode) => {  
  message.error(text)
}

export const successToast = (text:string|ReactNode) => {  
  message.success(text)
}

export const modalMessage = (title: string = "",content: string = "") => {
 const [modal] = Modal.useModal();
  const info = modal.info({
    title,
    content
  })

  setTimeout(() => {
    info.destroy();
  }, 1000);
}

export const getAttrInArray = (array:any[], fields: any[], options = {}) => {
    let newArray:any[] = []
    array.forEach(data => {
        let obj = {}
        for(let key in data) {
            if(fields.includes(key)) {
                obj[key] = data[key]
            }            
        }
        if(options.isNull) {
            newArray.push(obj)
        }else{
            let checkNull = Object.keys(obj).find(key => !obj[key])
            if(!checkNull) newArray.push(obj)

        }
    })
    return newArray
}

interface treeArrayProps {data : any[], parentField?: string,parentValue ?: null | any,keyValue : string}
export const treeArray = ( {data =[], parentField="",parentValue=null,keyValue=""}:treeArrayProps):any[] => {  
    if(data.length == 0) return data
    // let arr = data.filter(element => (element[parentField] == parentValue))
    let arr = data.filter(element => (element[parentField] == parentValue) ||(!parentValue && !(data.find(ele => ele[keyValue] == element[parentField]))))
    return arr.map((element:any[]) => {
      return {
        ...element,
        children: treeArray({
          data: data.filter(element => element[parentField] !== parentValue &&( parentValue || data.find(ele => ele[keyValue] == element[parentField]))),
          parentField,
          parentValue: element[keyValue as any] as string,
          keyValue
        })
      }
    })    
}

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
export const arrayDays = (startTime,endTime) => {
  const dateObjects = [];
  let currentDate = dayjs(startTime);

  while (currentDate.isBefore(endTime) || currentDate.isSame(endTime, 'day')) {
    dateObjects.push({
      date: currentDate.format('DD/MM/YYYY'),
      dayOfWeek: currentDate.format('dddd')
    });
    currentDate = currentDate.add(1, 'day');
  }
  console.log("dateObjects",dateObjects);
  
  return dateObjects;
}

export const tmpToTimeZone =(day:string) => { // Output: 202
return dayjs.unix(Number.parseFloat(day) / 1000).format('YYYY-MM-DDTHH:mm:ss')
}

export const TodayLimit = (day:any) => {
  const today = (new Date(day)).setHours(0,0,0).toString()
  const nextday = (new Date(day)).setHours(24,0,0).toString()
  console.log({today,nextday});
  
  return {today,nextday}
}

export const ExportExcel = (query:any) => {
  const params = new URLSearchParams(query);
window.location.href = (import.meta.env.VITE_BASE_URL || "") + `/api/method/frappe.core.doctype.data_import.data_import.download_template?${params.toString()}`
}

export const translationUrl = (url:string) => {
  window.location.href = url
}