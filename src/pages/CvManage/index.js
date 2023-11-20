import { useEffect, useState } from "react";
import { getCv } from "../../services/cvServices";
import { getJob } from "../../services/jobServices";
import { getCookie } from "../../helpers/cookies";
import DeleteCv from "./DeleteCv";
import { Button, Table, Tag, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const CvManage = () => {
    const id = getCookie("id");
    const [dataCv, setDataCv] = useState([]);
    const [dataJob, setDataJob] = useState([]);
    const fetchApi = async () => {
        const cv = await getCv(id);
        let result = [];
        for(let i = 0; i< cv.length; i++){
            const object = {
                ...cv[i],
                nameJob: ""
            }

            const job = await getJob(cv[i].idJob);
            object.nameJob = job.name;
            result.push(object);
        }
        setDataCv(result.reverse());
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
            dataIndex: 'nameJob',
            key: 'nameJob',
        },
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ngày gửi',
            dataIndex: 'createAt',
            key: 'createAt',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => {
                return (
                    <>
                        {record.statusRead ?
                            <Tag color="green">Đã đọc</Tag>
                            :
                            <Tag color="grey">Chưa đọc</Tag>}
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
                            <Link to={"/detail-cv/" + record.id}>
                                <Button icon={<EyeOutlined />} style={{ margin: 5 }} onClick={handleReload}></Button>
                            </Link>
                        </Tooltip>
                        <DeleteCv  record ={record} onReload ={handleReload}/>
                    </>
                )

            }
        },

    ]

    return (
        <>
        <h2>Danh sách CV</h2>

        <Table dataSource={dataCv} columns={columns}></Table>
        </>
    )
}

export default CvManage;