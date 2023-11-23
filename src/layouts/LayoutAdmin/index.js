import { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
    HomeOutlined

} from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';
import { Outlet, NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminStatus } from "../../actions/admin";
import "./LayoutAdmin.scss";
import MenuSider from '../../components/MenuSider';
const {Sider, Content } = Layout;

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const dispatch = useDispatch();
    const authen = useSelector(state => state.authenReducer);
    const admin = useSelector(state => state.adminReducer);
    
    return (
        <>
            <Layout className="layout-admin">
                <div
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                
                >
                    <div className='layout-admin__header'>
                        <Link hrefLang='/admin'
                            className={
                                "layout-admin__logo " + (collapsed ? "layout-admin__logo--fold" : "")
                            }
                        >
                            {collapsed ? (<><strong>IT</strong></>) : (<><strong>IT Admin</strong></>)}
                        </Link>
                        <div className="layout-admin__nav">
                            <div className="layout-admin__nav-left">
                                <Button
                                    type="text"
                                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                        fontSize: '16px',
                                        width: 64,
                                        height: 64,
                                    }}
                                ></Button>
                            </div>
                            <div className="layout-admin__nav-right">
                                <div className="layout-admin__nav">
                                    <div className="layout-admin__nav--item">
                                        <Button icon={<HomeOutlined />}
                                            onClick={() => {
                                                dispatch(adminStatus(false));
                                            }}
                                        ><NavLink to="/" >Trang chủ</NavLink></Button>
                                    </div>
                                    <div className="layout-admin__nav--item">
                                        <Button
                                        onClick={() => {
                                            dispatch(adminStatus(false));
                                        }} 
                                        icon={<LogoutOutlined />}>
                                        <NavLink to="/logout" >Đăng xuất</NavLink></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <Layout className="layout-admin__main">
                    <Sider trigger={null} collapsible theme="light" collapsed={collapsed} 
                        className="layout-admin__sider"
                    >
                        <div className="demo-logo-vertical" />
                        <MenuSider/>
                    </Sider>
                    <Content
                        className={
                            "layout-admin__content " + (collapsed ? "layout-admin__content--full" : "")
                         }
                        style={{
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
export default LayoutAdmin;