// 切换菜单弹出组件

import React, {useState, useEffect} from 'react'
import LeftMenu from "../leftMenu"

const {ipcRenderer} = window.electron

const ToggleMenu = () => {

    const [showLeftMenu, setShowLeftMenu] = useState(false)

    // effect 绑定/清除 window窗口resize事件
    useEffect(() => {
        ipcRenderer.on('window-resize', () => {
            if (showLeftMenu) {
                setShowLeftMenu(!showLeftMenu)
            }
        })
        // 卸载时清除
        return function clearListener() {
            ipcRenderer.removeListener('window-resize', () => {
            })
        }
    })

    // 切换
    const toggle = () => {
        setShowLeftMenu(prev => {
            return !prev
        })
    }

    const blurHandler = (event) => {
        // 防止向上冒泡
        const nodeClassName = event.target.className
        if (nodeClassName === 'toggle-menu-other-area') {
            toggle()
        }
    }

    ipcRenderer.on('window-resize', () => {
        if (showLeftMenu) {
            setShowLeftMenu(!showLeftMenu)
        }
    })


    return (
        <div className="toggle-content" onClick={(e) => {
            blurHandler(e)
        }}>
            <div className="toggle-menu-btn" onClick={(e) => {
                e.stopPropagation()
                toggle()
            }}>
                <div className="toggle-menu-item"></div>
                <div className="toggle-menu-item"></div>
                <div className="toggle-menu-item"></div>
            </div>
            {
                showLeftMenu &&
                <div className="toggle-menu">
                    <div className="toggle-menu-area">
                        <LeftMenu/>
                    </div>
                    <div className="toggle-menu-other-area"></div>
                </div>
            }
        </div>
    )
}

export default ToggleMenu
