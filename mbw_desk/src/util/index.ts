

export const getAttrInArray = (array:any[], fields: any[], options = {}) => {
    let newArray:any[] = []
    array.forEach(data => {
        let obj = {}
        for(let key in data) {
            if(fields.includes(key)) {
                obj[key] = data[key]
            }            
        }
        console.log("obj",obj);
        
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
    let arr = data.filter(element => element[parentField] == parentValue)
    return arr.map((element:any[]) => {
      return {
        ...element,
        children: treeArray({
          data: data.filter(element => element[parentField] !== parentValue),
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