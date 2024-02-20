export const getAttrInArray = (array=[], fields=[], options = {}) => {
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