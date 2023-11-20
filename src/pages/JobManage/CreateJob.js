import { Button, Select, Form, Input, Row, Col, message, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getListCity } from "../../services/cityServices";
import { getListTag } from "../../services/tagServices";
import { DollarOutlined } from "@ant-design/icons";
import { getCookie } from "../../helpers/cookies";
import { createJob } from "../../services/jobServices";

const CreateJob = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const rules = [
        {
            required: true,
            message: "Bắt buộc!",
        },
    ];
    const [dataTag, setDataTag] = useState([]);
    const [dataCity, setDataCity] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    const id = getCookie("id");

    const handleGoBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        const fetchApi = async () => {
            const listCity = await getListCity();
            const listTag = await getListTag();
            for (const item of listTag) {
                item.label = item.value;
            }
            for (const item of listCity) {
                item.label = item.value;
            }

            setDataCity(listCity);
            setDataTag(listTag);
        };
        fetchApi();
    }, [])

    const handleFinish = async (e) => {
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        const options = {
            idCompany: id,
            name: e.name,
            tags: e.tags,
            salary: e.salary,
            city: e.city,
            description: e.description,
            status: e.status,
            createAt: dateTime
        }

        await createJob(options);
        messageApi
            .open({
                type: 'loading',
                content: 'Đang tạo job..',
                duration: 2.5,
            })
            .then(() => message.success('Đã tạo thành công', 2.5))
    }



    return (
        <>
            {contextHolder}
            <Button onClick={handleGoBack}>Trở lại</Button>
            <h2>Tạo job mới</h2>
            <Form
                onFinish={handleFinish}
                layout="vertical"
                form={form}
                initialValues={{
                }}
            >
                <Form.Item name="name" label="Tên job" rules={rules}>
                    <Input />
                </Form.Item>
                <Row gutter={8}>
                    <Col span={16}>
                        <Form.Item name="tags" label="Tag" rules={rules}>
                            <Select mode="multiple" allowClear
                                style={{
                                    width: '100%',
                                }}
                                options={dataTag}
                            ></Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item name="salary" label="Mức lương" rules={rules}>
                            <Input addonAfter={<DollarOutlined />} />
                        </Form.Item>
                    </Col>


                </Row>
                <Form.Item name="city" label="Thành phố" rules={rules}>
                    <Select mode="multiple" allowClear
                        style={{
                            width: '100%',
                        }}
                        options={dataCity}
                    ></Select>
                </Form.Item>
                <Form.Item name="description" label="Mô tả">
                    <TextArea rows={12}></TextArea>
                </Form.Item>
                <Form.Item name="status" label="Trạng thái" valuePropName="checked">
                    <Switch  checkedChildren="Bật" unCheckedChildren="Tắt"></Switch>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Tạo mới
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default CreateJob;