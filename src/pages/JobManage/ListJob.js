import { getCookie } from "../../helpers/cookies";
import { useEffect, useState } from "react";
import { getListJobCompany } from "../../services/jobServices";
import { Button, Table, Tag, Tooltip } from "antd";
import { EyeOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";
import JobEdit from "./JobEdit";
import DeleteJob from "./DeleteJob";

const ListJob = () => {
    const id = getCookie("id");
    const [dataJob, setDataJob] = useState([]);
    const fetchApi = async () => {
        const data = await getListJobCompany(id);
        setDataJob(data.reverse());
    };

    useEffect(() => { 
        fetchApi();
    }, []);

    const handleReload = () => {
        fetchApi(); 
    }

    const columns = [
        {
            title: 'Tên job',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            render: (_, record) => {
                return (
                    <>
                        {record.tags.map((tag, index) => (
                            <Tag color="blue" key={index}>{tag}</Tag>
                        ))
                        }
                    </>
                )

            }
        },
        {
            title: 'Mức lương',
            dataIndex: 'salary',
            key: 'salary',
        },
        {
            title: 'Thời gian',
            render: (_, record) => {
                return (
                    <>
                        <p>
                            Ngày tạo: {record.createAt} Cập nhật: {record.updateAt}
                        </p>
                    </>
                )

            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => {
                return (
                    <>
                        {record.status ?
                            <Tag color="cyan">Đang bật</Tag>
                            :
                            <Tag color="red">Đang tắt</Tag>}
                    </>
                )

            }
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <>
                        <Tooltip title="Xem chi tiết">
                            <Link to={"/detail-job/" + record.id}>
                                <Button icon={<EyeOutlined />} style={{ margin: 5 }}></Button>
                            </Link>
                        </Tooltip>
                        <JobEdit record ={record} onReload ={handleReload}/>
                        <DeleteJob  record ={record} onReload ={handleReload}/>
                    </>
                )

            }
        },

    ]

    return (
        <>
            <Table dataSource={dataJob} columns={columns}></Table>
        </>
    )
}

export default ListJob;