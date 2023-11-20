import { Card, Form, Input, Button, Space, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { generateToken } from "../../helpers/generate";
import { existUser, createUser } from '../../services/companyServices ';

const Register = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const rules = [
        {
            required: true,
            message: "Bắt buộc!",
        },
    ];

    const handleFinish = async (e) => {
        const companyName = e.companyName;
        const token = generateToken();
        const email = e.email;
        const password = e.password;

        const options = {
            "conpanyName": companyName,
            "email" : email,
            "password" : password,
            "token" : token
        };

        const checkExist = await existUser(email);
        console.log(checkExist);

        if(checkExist.length > 0) {
            alert("Đã tồn tại email");
        } else {
            const result = await createUser(options);
            if(result) {
                navigate("/login");
            }
        }
    };

    return(
        <>
             <Space direction="vertical" size="middle" style={{ display: 'flex' }} align='center'>
                <Card
                    title="Đăng kí"
                    style={{
                        width: 400,
                    }}
                >
                    <Form
                        onFinish={handleFinish}
                        layout="vertical"
                        form={form}
                        initialValues={{
                        }}
                    >
                        <Form.Item name="companyName" label="Tên công ty" rules={rules}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="phone" label="Số điện thoại" rules={rules}>
                            <Input type='number'/>
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={rules}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="Password" rules={rules}>
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Đăng kí
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Space>
        </>
    )
}

export default Register;