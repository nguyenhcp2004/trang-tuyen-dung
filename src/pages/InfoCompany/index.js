import { Button, Card, Form, Row, Input, Col, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { getCompany, updateCompany } from "../../services/companyServices ";
import { getCookie } from "../../helpers/cookies";

const InfoCompany = () => {
    const [form] = Form.useForm();
    const [dataCompany, setDataCompany] = useState();
    const [edit, setEdit] = useState(true);
    const [api, contextHolder] = notification.useNotification();
    const rules = [
        {
            required: true,
            message: "Bắt buộc!",
        },
    ];
    const id = getCookie("id");

    useEffect(() => {
        const fetchApi = async () => {
            const company = await getCompany(id);
            setDataCompany(company);
        }
        fetchApi();
    }, [])

    const handleFinish = (e) => {
        const options = {
            companyName: e.companyName,
            email : e.email,
            phone : e.phone,
            address: e.address,
            quantityPeople: e.quantityPeople,
            workingTime: e.workingTime,
            website: e.website,
            description: e.description,
            detail: e.detail
        }

        const fetchApi = async () => {
            await updateCompany(id, options);
            const company = await getCompany(id);
            setDataCompany(company);
            handleEdit();
            api.success({
                message: 'Cập nhật thành công',
                description:
                  'Thông tin đã được thay đổi',
                duration: 2
              });

        };
        fetchApi();
    }

    const handleEdit= () => {
        setEdit(!edit);
    }


    return (
        <>
        {contextHolder}
        {dataCompany && (
             <Card
             title="Thông tin công ty"
             extra={<Button onClick={handleEdit}>Chỉnh sửa</Button>}
         >
             <Form
                 onFinish={handleFinish}
                 layout="vertical"
                 form={form}
                 initialValues={{
                     companyName: dataCompany.companyName,
                     email : dataCompany.email,
                     phone : dataCompany.phone,
                     address: dataCompany.address,
                     quantityPeople: dataCompany.quantityPeople,
                     workingTime: dataCompany.workingTime,
                     website: dataCompany.website,
                     description: dataCompany.description,
                     detail: dataCompany.detail
                 }}
                disabled={edit}
             >
                 <Form.Item name="companyName" label="Tên công ty" rules={rules}>
                     <Input />
                 </Form.Item>
                 <Row gutter={8}>
                     <Col span={8}>
                         <Form.Item name="email" label="Email" rules={rules}>
                             <Input />
                         </Form.Item>
                     </Col>
                     <Col span={8}>
                         <Form.Item name="phone" label="Số điện thoại" >
                             <Input />
                         </Form.Item>
                     </Col>

                     <Col span={8}>
                         <Form.Item name="address" label="Địa chỉ" >
                             <Input />
                         </Form.Item>
                     </Col>
                     <Col span={8}>
                         <Form.Item name="quantityPeople" label="Số lượng nhân sự" >
                             <Input />
                         </Form.Item>
                     </Col>

                     <Col span={8}>
                         <Form.Item name="workingTime" label="Thời gian làm việc" >
                             <Input />
                         </Form.Item>
                     </Col>

                     <Col span={8}>
                         <Form.Item name="website" label="Link website" >
                             <Input />
                         </Form.Item>
                     </Col>

                 </Row>
                 <Form.Item name="description" label="Mô tả ngắn" >
                     <TextArea rows={4}></TextArea>
                 </Form.Item>
                 <Form.Item name="detail" label="Mô tả chi tiết">
                     <TextArea rows={12}></TextArea>
                 </Form.Item>
                 <Form.Item>
                     <Button type="primary" htmlType="submit" style={{marginRight : 10}}>
                         Cập nhật
                     </Button>
                     <Button onClick={handleEdit}>
                         Hủy
                     </Button>
                 </Form.Item>
             </Form>
         </Card>
        )}
           
        </>
    )
}

export default InfoCompany;