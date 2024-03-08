import classNames from "classnames"


interface imageProps {
  src : string|any,
  height?:number
}
export default function ImageSlide({src,height=100}:imageProps) {
  return (
    <div className={classNames(`h-[${height}px]` ,"rounded-[8px] overflow-hidden mx-3")}>
      <img
        className="h-full w-full !object-cover"
        src={
          src
        }
      />
    </div>
  )
}
