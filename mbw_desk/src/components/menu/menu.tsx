import { Menu } from 'antd'
import styled from 'styled-components'
const WrapperMenu = styled.div`
& .ant-menu {
    &.ant-menu-vertical  {
        & .ant-menu-item ,&  .ant-menu-submenu .ant-menu-submenu-title {
            padding-top:10px;
        }
    }
    & .ant-menu-item,& .ant-menu-submenu .ant-menu-submenu-title {
        border-radius: 0;
        color: #212B36;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        min-height: 40px;
        height: unset!important;
        & .ant-menu-item-icon {
            color: #637381!important;
        }
        &.ant-menu-item-selected a {
            // display:block;
            & p {
                width:100%;
                display:block;
                font-weight: 600!important;
                white-space: normal!important;
                padding: 4px 0!important;
            }
        }

        &.ant-menu-item-selected .ant-menu-item-icon {
            color: #212B36!important;
        }
    }

    & .ant-menu-submenu:has(.ant-menu-item-selected) .ant-menu-item-icon{
        color: #212B36!important;
    }

}


`

export const MenuCustom = ({...props}) => {
    return <WrapperMenu>
        <Menu {...props}/>
    </WrapperMenu>
}
