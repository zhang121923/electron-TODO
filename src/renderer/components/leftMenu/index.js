import React, {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'

import defaultIcon from '../../assets/user.jpg';
import {getTODONumber, getUserInfo} from "../../server";


const LeftMenu = (props) => {

    const [userInfo, setUserInfo] = useState({
        userName: null,
        icon: null,
        email: null
    })

    const [taskInfo, setTaskInfo] = useState({
        today: [],
        important: [],
        plan: [],
        desc: [],
        task: []
    })

    useEffect(() => {
        // 获取主页的相关信息111
        getUserInfo().then(res => {
            const {userName, icon, email} = res.data;
            setUserInfo({userName, icon, email})
        });
    }, [])

    useEffect(() => {
        // 获取TODO数据列表
        getTODONumber().then(res => {

            const {today, important, plan, desc, task} = res.data;
            setTaskInfo({today, important, plan, desc, task})
        });
    }, [])

    return (
        <div className="left-menu">
            <ul className="menu">
                <li>
                    <div className="user-info">
                        <div className="user-icon">
                            <img src={userInfo.icon || defaultIcon} className="user-img"/>
                        </div>
                        <div className="user-desc">
                            <strong className="user-desc-name">{userInfo.userName || 'zhang121923'}</strong>
                            <small className="user-desc-email">{userInfo.email || 'zhang121923@sina.com'}</small>
                        </div>
                    </div>
                    <small className="right-corner-mark iconfont">&#xe661;</small>
                </li>
                <li>
                    <NavLink activeClassName="left-menu-route-selected" className="left-menu-route" to="/oneDay">
                        <i className="iconfont">&#xf0e6;</i>
                        <label>我的一天</label>
                        <small className="right-corner-mark">{taskInfo.today.length || ''}</small>
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="left-menu-route-selected" className="left-menu-route" to="/important">
                        <i className="iconfont">&#xe677;</i>
                        <label>重要</label>
                        <small className="right-corner-mark">{taskInfo.important.length || ''}</small>
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="left-menu-route-selected" className="left-menu-route" to="/plan">
                        <i className="iconfont">&#xe72a;</i>
                        <label>已计划日程</label>
                        <small className="right-corner-mark">{taskInfo.plan.length || ''}</small>
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="left-menu-route-selected" className="left-menu-route" to="/distribute">
                        <i className="iconfont">&#xe60e;</i>
                        <label>已分配给你</label>
                        <small className="right-corner-mark">{taskInfo.desc.length || ''}</small>
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="left-menu-route-selected" className="left-menu-route" to="/task">
                        <i className="iconfont">&#xe9ce;</i>
                        <label>任务</label>
                        <small className="right-corner-mark">{taskInfo.task.length || ''}</small>
                    </NavLink>
                </li>
            </ul>
            <hr className="menu-seperate"/>
        </div>
    )
}

export default LeftMenu;
