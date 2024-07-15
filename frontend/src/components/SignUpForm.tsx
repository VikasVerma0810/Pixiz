

// SignUpFrom.tsx
import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button,  Form, Input, Modal } from 'antd';

interface SignUpFormProps {
  visible: boolean;
  onClose: () => void;
  onRedirectToLogin: () => void; // Add a new prop for redirection to login modal
}

const SignUpForm: React.FC<SignUpFormProps> = ({ visible, onClose, onRedirectToLogin }) => {
  const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false); // State to track redirection



    const onFinish = async (values: any) => {
        try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
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
            throw new Error('Failed to sign up: ' + response.statusText);
        }
    
        onClose(); // Close the signup modal
        // Optionally, redirect to login modal
        setRedirectToLogin(true);
        } catch (error) {
        console.error('Failed to sign up:', error);
        }
    };
    

  // Redirect to login modal if the state is true
  if (redirectToLogin) {
    onRedirectToLogin(); // Trigger the redirection to login modal
    setRedirectToLogin(false); // Reset the state
  }

  return (
    <Modal
      visible={visible}
      title="Sign Up"
      onCancel={onClose}
      footer={null}
    >
      <Form
        name="normal_signup"
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

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' ,  backgroundColor: '#8367bb'}}>
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignUpForm;
