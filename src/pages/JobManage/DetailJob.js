import { useNavigate, useParams } from 'react-router-dom';
import { Button, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { getJob } from '../../services/jobServices';

const DetailJob = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [dataJob, setDataJob] = useState();
    const handleGoBack = () => {
        navigate(-1);
    };


    useEffect(() => {
        const fetchApi = async () => {
            const data = await getJob(params.id);
            setDataJob(data);
        };
        fetchApi();
    }, []);

    return (
        <>
            {dataJob && (
                <>
                    <Button onClick={handleGoBack}>Trở lại</Button>
                    <h2>Tên job: {dataJob.name} </h2>
                    <div>Trạng thái: {dataJob.status ? <Tag color="cyan">Đang bật</Tag> : <Tag color="red">Đang tắt</Tag>}</div>
                    <div>Tags:  {dataJob.tags.map((tag, index) => (
                        <Tag color="blue" key={index}>{tag}</Tag>
                    ))
                    }</div>
                    <div>Mức lương: <strong>{dataJob.salary}$</strong></div>
                    <div>Ngày tạo: <strong>{dataJob.createAt}</strong></div>
                    <div>Cập nhật: <strong>{dataJob.updateAt}</strong></div>
                    <div>Thành phố: {dataJob.city.map((city, index) => (
                        <Tag color="orange" key={index}>{city}</Tag>
                    ))
                    }</div>
                    <div>Mô tả: </div>
                    <div>{dataJob.description}</div>
                </>
            )}

        </>
    )
}

export default DetailJob;