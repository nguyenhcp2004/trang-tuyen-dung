import { Outlet, Link, NavLink } from "react-router-dom";
import "./LayoutDefault.scss";
import { getCookie } from "../../helpers/cookies";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { LogoutOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";
import { adminStatus } from "../../actions/admin";
import LayoutAdmin from "../LayoutAdmin";



const LayoutDefault = () => {
    const token = getCookie("token");
    const authen = useSelector(state => state.authenReducer);
    const dispatch = useDispatch();
    const admin = useSelector(state => state.adminReducer);

    return (
        <>
            {admin ? (<>
                <LayoutAdmin />
            </>) : (<>
                <header>
                    <div className="layout">
                        <div className="layout__header">
                            <Link to="/" className="layout__logo " >
                                <strong>IT Jobs</strong>
                            </Link>

                            {token ? (<>
                                <div className="layout__nav">
                                    <div className="layout__nav--item">
                                        {/* <Button icon={<HomeOutlined />}
                                            onClick={() => {
                                                dispatch(adminStatus(false));
                                            }}
                                        ><NavLink to="/" >Trang chủ</NavLink></Button> */}
                                        <Button icon={<UserOutlined />}
                                            onClick={() => {
                                                dispatch(adminStatus(true));
                                            }}
                                        ><NavLink to="/admin" >Quản lí</NavLink></Button>

                                    </div>
                                    <div className="layout__nav--item">
                                        <Button icon={<LogoutOutlined />}><NavLink to="/logout" >Đăng xuất</NavLink></Button>
                                    </div>
                                </div>
                            </>) : (<>
                                <div className="layout__nav">
                                    <div className="layout__nav--item">
                                        <Button ><NavLink to="/login" > Đăng Nhập</NavLink></Button>
                                    </div>
                                    <div className="layout__nav--item">
                                        <Button type="primary" ><NavLink to="/register" > Đăng Kí</NavLink></Button>
                                    </div>
                                </div>
                            </>)}
                        </div>
                    </div>
                </header>

                <main className="container">
                    <Outlet />
                </main>

                <footer className="footer">
                    <p>Copyright 2023 by 28tech</p>
                </footer>
            </>)}

        </>
    )
}

export default LayoutDefault;