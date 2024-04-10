import React, { ReactNode, useState } from 'react'
import Content from './content'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import logo from "@/assets/react.svg";
import { ArrowDown } from './icon';
import classNames from 'classnames';
import { MenuOutlined } from '@ant-design/icons';

export function MenuItem({ children, to, button }: {
    children: ReactNode,
    to?: string,
    button?: boolean
}) {
    const navigate = useNavigate()
    return <div className={classNames('p-4 cursor-pointer flex items-center font-medium text-base text-[#525252]', button && "leading-[19.5px] h-5 rounded-lg py-2 bg-[#C4161C] text-[#FFFFFF] text-[13px] font-normal")} onClick={() => {
        if(to){
        window.location.href = to
        }
    }}>{children}</div>
}

interface Props { }

function Header(props: Props) {
    const { } = props
    const { t } = useTranslation()
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const itemsDownLoad: MenuProps['items'] = [
        {
            label: <Link to={'https://play.google.com/store/apps/details?id=mbw.next.ess'}>Ứng dụng ESS dành cho Android</Link>,
            key: '0',
        },
        {
            label: <Link to='https://apps.apple.com/no/app/mbw-ess/id6473134079'>Ứng dụng ESS dành cho IOS</Link>,
            key: '1',
        },
        {
            label: <Link to="https://play.google.com/store/apps/details?id=mbw.next.dms">Ứng dụng SFA dành cho Android</Link>,
            key: '2',
        },
        {
            label: "Ứng dụng SFA dành cho IOS",
            key: '3',
        },
    ]

    const itemsSupport: MenuProps['items'] = [
        {
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://zalo.me/0901508000">
                    Zalo 0901508000
                </a>
            ),
            key: '0',
        },
        {
            label: "Tổng đài 1900 400 008",
            key: '1',
        },
    ]

    return (
        <>
            <Content bg pd>
                <div >
                    <img src={logo} className="object-contain w-[32px] h-[32px]" />
                </div>
                <div>
                    <div className='block lg:hidden px-3 py-1 border border-solid border-[#0000001a] w-fit rounded' onClick={()=> setShowMenu(prev => !prev)}><MenuOutlined /></div>
                    <div className={classNames("hidden lg:flex flex-col lg:flex-row lg:items-center")}>
                        <MenuItem to='https://mbw.vn/ve-mbw/'>
                            {t('about_MBW')}
                        </MenuItem>
                        <Dropdown
                            placement='bottomRight'
                            menu={{
                                items: itemsDownLoad
                            }}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <MenuItem >
                                        {t('dowload_mobile_app')}
                                        <ArrowDown />
                                    </MenuItem>
                                </Space>
                            </a>

                        </Dropdown>
                        <Dropdown
                            placement='bottomRight'
                            menu={{
                                items: itemsSupport
                            }}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <MenuItem >
                                        {t('support')}
                                        <ArrowDown />
                                    </MenuItem>
                                </Space>
                            </a>
                        </Dropdown>
                        <MenuItem to='https://docsdms.mbwcloud.com/HDSD_MBWDMS/s%E1%BB%AD-d%E1%BB%A5ng-dms-tr%C3%AAn-erpnext'>
                            {t('hdsd')}
                        </MenuItem>

                        <MenuItem button>
                            {t('support')}
                        </MenuItem>
                    </div>
                </div>
            </Content>
            <Content bg>
                {showMenu && <div className={classNames("w-full py-3 flex lg:hidden flex-col  items-center justify-center")}>
                    <MenuItem to='https://mbw.vn/ve-mbw/' >
                        {t('about_MBW')}
                    </MenuItem>
                    <Dropdown
                        placement='bottomRight'
                        menu={{
                            items: itemsDownLoad
                        }}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <MenuItem >
                                    {t('dowload_mobile_app')}
                                    <ArrowDown />
                                </MenuItem>
                            </Space>
                        </a>

                    </Dropdown>
                    <Dropdown
                        placement='bottomRight'
                        menu={{
                            items: itemsSupport
                        }}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <MenuItem >
                                    {t('support')}
                                    <ArrowDown />
                                </MenuItem>
                            </Space>
                        </a>
                    </Dropdown>
                    <MenuItem to='https://docsdms.mbwcloud.com/HDSD_MBWDMS/s%E1%BB%AD-d%E1%BB%A5ng-dms-tr%C3%AAn-erpnext'>
                        {t('hdsd')}
                    </MenuItem>

                    <MenuItem button>
                        {t('support')}
                    </MenuItem>
                </div>}
            </Content>
        </>

    )
}

export default Header
