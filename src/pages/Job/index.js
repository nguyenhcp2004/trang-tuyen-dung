import { useParams } from "react-router-dom";
import { getJob } from "../../services/jobServices";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Tag, Form, Row, Select, Input, Col, notification } from "antd";
import "./Job.scss";
import { getCompany } from "../../services/companyServices ";
import { getListCity } from "../../services/cityServices";
import TextArea from "antd/es/input/TextArea";
import { createCv } from "../../services/cvServices";

const Job = () => {
    const [form] = Form.useForm();
    const params = useParams();
    const [dataJob, setDataJob] = useState();
    const [dataCompany, setDataCompany] = useState();
    const [dataCity, setDataCity] = useState([]);
    const navigate = useNavigate();
    const [notify, contextHolder] = notification.useNotification();

    const formApply = document.querySelector(".formApply")

    const rules = [
        {
            required: true,
            message: "Bắt buộc!",
        },
    ];

    useEffect(() => {
        const fetchApi = async () => {
            const job = await getJob(params.id);
            const company = await getCompany(job.idCompany);
            const citys = await getListCity();
            setDataJob(job);
            setDataCompany(company);
            setDataCity(citys);
        }

        fetchApi();
    }, []);

    const handleReturn = () => {
        navigate(-1);
    }

    const handleFinish = async (values) => {
        let object = {
            ...values,
            createAt: dataJob.createAt,
            statusRead: false,
            idCompany: dataCompany.id,
            idJob: dataJob.id
        }
        const result = await createCv(object);
        if (result) {
            form.resetFields();
            notify.success({
                message: 'Cập nhật thành công',
                description:
                    'Nhà tuyển dụng sẽ liên hệ với bạn trong thời gian sớm nhất.',
            });
        }
    };

    return (
        <>
            {contextHolder}
            <Button onClick={handleReturn}>Trở lại</Button>
            {dataJob && (
                <>
                    <h1>{dataJob.name}</h1>
                    <Button type="primary" size="large" onClick={() => {
                        formApply.scrollIntoView({ behavior: "smooth" });
                    }} >ỨNG TUYỂN NGAY</Button>
                    <div className="company">
                        <div className="company__info">
                            <span>Tags:
                                {dataJob.tags.map((tag, index) => (
                                    <Tag key={index} color="cyan" className="tag">{tag}</Tag>
                                ))}
                            </span>
                            <br />
                            <span>Thành phố:
                                {dataJob.city.map((city, index) => (
                                    <Tag key={index} color="volcano" className="tag">{city}</Tag>
                                ))}
                            </span>
                            <br />
                            <span>Lương: <strong>{dataJob.salary}$</strong></span>
                            <br />
                            <span>Công ty: <strong>{dataJob.companyName}</strong></span>
                            <br />
                            <span>Ngày tạo: <strong>{dataJob.createAt}</strong></span>
                            <br />
                            <div>Mô tả công việc:</div>
                        </div>
                        <div>{dataJob.description}</div>
                        <div>Giới thiệu công ty </div>
                        {dataCompany && (
                            <div>{dataCompany.description}</div>
                        )}
                    </div>
                </>
            )}

            <Form
                onFinish={handleFinish}
                layout="vertical"
                form={form}
                initialValues={{
                    tag: ""
                }}
                className="formApply"
            >
                <Row gutter={8}>
                    <Col span={6}>
                        <Form.Item name="name" label="Họ tên" rules={rules}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="phone" label="Số điện thoại" rules={rules}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="email" label="Email" rules={rules}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="city" rules={rules} label="Chọn thành phố">
                            <Select allowClear options={dataCity} placeholder="Chọn thành phố" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name="description" label="Giới thiệu bản thân" rules={rules}>
                    <TextArea rows={6}></TextArea>
                </Form.Item>
                <Form.Item name="linkProject" label="Danh sách link project đã làm" rules={rules}>
                    <TextArea rows={6}></TextArea>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        GỬI YÊU CẦU
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Job;