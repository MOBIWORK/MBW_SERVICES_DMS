import classNames from 'classnames'


interface dropProps {
  children: any,
  title?: any
}
export function DropDownCustom({children,title}: dropProps) {
  return (
    <div className={classNames("bg-white shadow-lg mt-0 p-4 rounded-lg")}>
        <div className='font-medium text-base text-[#212B36] mb-4'>{title}</div>
        {children}
    </div>
  )
}
