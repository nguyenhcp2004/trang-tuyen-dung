import { Button, Card, Tag } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editCv, getCvById } from "../../services/cvServices";
import { getJob } from "../../services/jobServices";


const DetailCv = () => {
    const [dataCv, setDataCv] = useState([]);
    const [dataJob, setDataJob] = useState([]);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const fetchApi = async () => {
            const cv = await getCvById(params.id);
            const object = {
                ...cv,
                statusRead: true
            }
            setDataCv(object);
            await editCv(params.id, object);
            const job = await getJob(cv.idJob);
            setDataJob(job);
        }
        fetchApi();
    }, [])

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <>
            <Button onClick={handleGoBack}>Trở lại</Button>
            <br />
            <br />
            <Card
                title={"Ứng viên: " + dataCv.name}
            >
                <div>Ngày gửi: <strong>{dataCv.createAt}</strong> </div>
                <div>Số điện thoại: <strong>{dataCv.phone}</strong> </div>
                <div>Email: <strong>{dataCv.email}</strong> </div>
                <div>Thành phố ứng tuyển: <strong>{dataCv.city}</strong> </div>
                <div>Giới thiệu bản thân: </div>
                <div>{dataCv.description}</div>
                <div>Link project: </div>
                <div>{dataCv.linkProject}</div>
            </Card>
            <br />
            <br />
            <Card
                title={"Thông tin job: " + dataJob.name}
            >
                <div>Tags: {dataJob.tags && (
                    <>
                        {dataJob.tags.map((item, index) => (
                            <Tag color="blue" key={index}>{item}</Tag>
                        ))}
                    </>
                )} </div>
                <div>Mức lương: <strong>{dataJob.salary}$</strong> </div>
                <div>Mô tả: </div>
                <div>{dataJob.description}</div>
            </Card>

        </>
    )
}

export default DetailCv;