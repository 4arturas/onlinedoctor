'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { FormEvent, useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import axios from 'axios'; // Import Axios

export default function Login() {
  const locale = useLocale();
  const t = useTranslations('Login');
  const [error, setError] = useState<string>();
  const router = useRouter();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const result = await signIn('credentials', {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/' + locale);
      }
    } catch (err) {
      setError(t('unknownError'));
    }
  };

  const onFinishJwt = async (values: { email: string; password: string }) => {
    try {
      const response = await axios.post('/api/jwt', {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem('token', response.data.token);

      // localStorage.setItem('user', JSON.stringify(response.data.user));

      router.push('/' + locale);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || t('unknownError'));
      } else {
        setError(t('unknownError'));
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Form
        name="login"
        onFinish={onFinish}
        // onFinish={onFinishJwt}
        style={{
          width: 300,
        }}
      >
        <Form.Item
          label={t('username')}
          name="username"
          rules={[{ required: true, message: t('usernameRequired') }]}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          label={t('password')}
          name="password"
          rules={[{ required: true, message: t('passwordRequired') }]}
        >
          <Input.Password />
        </Form.Item>

        {error && (
          <Form.Item>
            <Alert message={error} type="error" showIcon />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t('submit')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}