import { Menu } from "antd";
import { 
    UserOutlined,
    DashboardOutlined,
    UnorderedListOutlined,
    AuditOutlined,
} from '@ant-design/icons';
import { Link } from "react-router-dom";

const MenuSider = () => {
    const items = [
        {
            key: "dashboard",
            icon: <DashboardOutlined />,
            label: <Link to="/admin">Tổng quan</Link>,

        },
        {
            key: "info-company",
            icon: <UserOutlined />,
            label: <Link to="/info-company">Thông tin công ty</Link>,

        },
        {
            key: "job-manage",
            icon: <UnorderedListOutlined />,
            label:  <Link to="/job-manage">Quản lý việc làm </Link>,

        },
        {
            key: "cv-manage",
            icon: <AuditOutlined />,
            label: <Link to="/cv-manage">Quản lý CV</Link>,

        },
    ];

    return (
        <>
            <>
                <Menu
                    theme="light"
                    mode="inline"
                    items={items}
                    defaultOpenKeys={['dashboard']}
                    defaultSelectedKeys={['dashboard']}
                />
            </>
        </>
    )
}

export default MenuSider;