import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface ILogin {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values: ILogin) => {
    const res = await fetch('http://localhost:3000/users');
    const data = await res.json();

    const user = data.find(
      (user: { email: string; password: string }) =>
        user.email === values.email && user.password === values.password
    );

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      message.success('Đăng nhập thành công');
      navigate('/admin/products');
    } else {
      message.error('Đăng nhập thất bại');
    }
  };

  return (
    <div style={{ margin: 'auto', maxWidth: '400px' }}>
      <h1>Login</h1>
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or   <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
