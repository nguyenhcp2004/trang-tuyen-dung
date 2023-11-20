import { Card, Form, Input, Button, Space } from 'antd';
import { getUser } from '../../services/companyServices ';
import { checkAuthen } from "../../actions/authen";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCookie } from "../../helpers/cookies";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const rules = [
        {
            required: true,
            message: "Bắt buộc!",
        },
    ];

    const handleFinish = async (e) => {
        const email = e.email;
        const password = e.password;

        const data = await getUser(email, password);

        if(data.length > 0){
            setCookie("id", data[0].id, 1);
            setCookie("email", data[0].email, 1);
            setCookie("token", data[0].token, 1);

            dispatch(checkAuthen(true));
            navigate("/");
        } else {
            alert("Email hoặc mật khấu không đúng!")
        }
    };

    return (
        <>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }} align='center'>
                <Card
                    title="Đăng nhập"
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
                        <Form.Item name="email" label="Email" rules={rules}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="Password" rules={rules}>
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Space>

        </>
    )
}

export default Login;