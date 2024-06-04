import { forwardRef, useEffect, useLayoutEffect, useState } from 'react'

export {default} from './useCookie'

export const useResize = () => {
    const [size,setSize] = useState<{w:number,h:number}>({
        w:document.documentElement.offsetWidth,
        h: document.documentElement.offsetHeight
    })

    useLayoutEffect(() => {
        const rsEvent = () => {
            let width = document.documentElement.offsetWidth
            let height = document.documentElement.offsetHeight
            setSize({
                w:width,
                h:height
            })
        }
        
        window.addEventListener("resize",rsEvent)

        return () =>{
            window.removeEventListener("resize",rsEvent)
        } 

    } ,[])
    return size

}
