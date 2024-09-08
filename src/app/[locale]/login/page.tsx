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

  const onFinish = async (values: { email: string; password: string }) => {
    // Original signIn function (if you want to keep it)
    try {
      const result = await signIn('credentials', {
        email: values.email,
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
        onFinish={onFinishJwt} // Change to onFinishJwt
        style={{
          width: 300,
        }}
      >
        <Form.Item
          label={t('username')}
          name="email"
          rules={[{ required: true, message: t('usernameRequired') }]}
        >
          <Input type="email" />
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