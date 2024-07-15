
// SignInForm.tsx
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal } from 'antd';

interface SignInFormProps {
  visible: boolean;
  onClose: () => void;
  onLogin: (username: string) => void; // Add onLogin prop
}

const SignInForm: React.FC<SignInFormProps> = ({ visible, onClose, onLogin }) => {

  const onFinish = async (values: any) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json(); 
      const { username } = data;
      
      
      onLogin(username);

      onClose(); 
    } catch (error) {
      console.error('Failed to sign in:', error);
     
    }
  };

  return (
    <Modal
      visible={visible}
      title="Sign In"
      onCancel={onClose}
      footer={null}
    >
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button className="form-button" htmlType="submit" style={{ width: '100%', backgroundColor: '#8367bb' }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignInForm;
