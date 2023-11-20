import { Button, Modal, Tooltip,  Form, Input, Row, Col, Switch, Select, message  } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import TextArea from "antd/es/input/TextArea";
import { DollarOutlined } from "@ant-design/icons";
import { getListCity } from "../../services/cityServices";
import { getListTag } from "../../services/tagServices";
import { getCookie } from "../../helpers/cookies";
import { editJob } from "../../services/jobServices";

const JobEdit = (props) => {
    const { record, onReload } = props;
    console.log(record);
    const [isShowModal, setIsShowModal] = useState(false);
    const [dataTag, setDataTag] = useState([]);
    const [dataCity, setDataCity] = useState([]);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const rules = [
        {
            required: true,
            message: "Bắt buộc!",
        },
    ];

    const id = getCookie("id");

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

    const handleShowModal = () => {
        setIsShowModal(true);
    }

    const handleCancelModal = () => {
        setIsShowModal(false);
        form.resetFields();
    }

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
            updateAt: dateTime
        }

        await editJob(record.id, options);
        messageApi
        .open({
            type: 'loading',
            content: 'Đang cập nhật..',
            duration: 2.5,
        })
        .then(() => message.success('Đã cập nhật thành công', 2.5));
        onReload();
        setTimeout(() => {
            setIsShowModal(false);
        }, 3000);      
    }

    return (
        <>
            {contextHolder}
            <Tooltip title="Chỉnh sửa">
                <Button icon={<EditOutlined />}
                    style={{ margin: 5 }}
                    onClick={handleShowModal}
                    type="primary"
                    ghost
                ></Button>
            </Tooltip>

            <Modal title="Chỉnh sửa" open={isShowModal} onCancel={handleCancelModal} maskClosable={false} footer={null}>
                <Form
                    onFinish={handleFinish}
                    layout="vertical"
                    form={form}
                    initialValues={record}
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
                        <Switch checkedChildren="Bật" unCheckedChildren="Tắt"></Switch>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default JobEdit;