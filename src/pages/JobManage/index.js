import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ListJob from "./ListJob";
import { Link } from "react-router-dom";

const JobManage = () => {
    return (
        <>
        <h2>Danh sách việc làm</h2>
        <Link to="/create-job"><Button icon={<PlusOutlined />} > Tạo việc mới</Button></Link>
        

        <br/>
        <br/>

        <ListJob/>
        </>
    )
}

export default JobManage;