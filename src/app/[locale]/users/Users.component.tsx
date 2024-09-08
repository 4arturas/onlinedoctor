'use client';

import { Table, Button, Input, Modal, Form, message, Select } from 'antd';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
  lastname: string;
  classificationId: number;
  password: string; // Include password in the User interface
}

interface UserClassification {
  id: number;
  type: string;
}

type UsersProps = {
  onAdd(user: { email: string; name: string; lastname: string; classificationId: number; password: string }): Promise<void>;
  onDelete(id: number): Promise<void>;
  onUpdate(id: number, user: { email: string; name: string; lastname: string; classificationId: number; password: string }): Promise<void>;
  users: Array<User>;
};

function Users({
                 onAdd,
                 onDelete,
                 onUpdate,
                 users,
               }: UsersProps): React.ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const t = useTranslations('Users');
  const [classifications, setClassifications] = useState<Array<UserClassification>>([]);

  async function fetchClassifications(): Promise<void> {
    try {
      const response = await axios.get('/api/user-classifications');
      setClassifications(response.data);
    } catch (error) {
      message.error('Failed to fetch classifications');
    }
  }

  useEffect(() => {
    fetchClassifications();
  }, []);

  async function handleSubmit(values: { email: string; name: string; lastname: string; classificationId: number; password: string }): Promise<void> {
    try {
      if (editingUser) {
        await onUpdate(editingUser.id, values);
        message.success(t('userUpdated'));
      } else {
        await onAdd(values);
        message.success(t('userCreated'));
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingUser(null);
    } catch (error) {
      message.error(t('userSaveFailed'));
    }
  }

  function openModal(user?: User): void {
    setEditingUser(user || null);
    if (user) {
      form.setFieldsValue({
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        classificationId: user.classificationId,
        password: user.password,
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  }

  const columns = [
    {
      title: t('id'),
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('lastname'),
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: t('classificationId'),
      dataIndex: 'classificationId',
      key: 'classificationId',
      render: (classificationId: number) => {
        const classification = classifications.find((c) => c.id === classificationId);
        return classification ? classification.type : '';
      },
    },
    {
      title: t('actions'),
      key: 'actions',
      render: (text: string, record: User) => (
        <span>
          <Button onClick={() => openModal(record)} style={{ marginRight: 8 }} type="primary">
            {t('edit')}
          </Button>
          <Button danger onClick={() => onDelete(record.id)} type="primary">
            {t('delete')}
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h1>{t('title')}</h1>
      <Button onClick={() => openModal()} style={{ marginBottom: 16 }} type="primary">
        {t('addUser')}
      </Button>
      <Table columns={columns} dataSource={users} rowKey="id" />

      <Modal
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        open={isModalOpen}
        title={editingUser ? t('editUser') : t('addUser')}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label={t('email')}
            name="email"
            rules={[{ required: true, message: t('emailRequired') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('name')}
            name="name"
            rules={[{ required: true, message: t('nameRequired') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('lastname')}
            name="lastname"
            rules={[{ required: true, message: t('lastnameRequired') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('classificationId')}
            name="classificationId"
            rules={[{ required: true, message: t('classificationIdRequired') }]}
          >
            <Select>
              {classifications.map((classification) => (
                <Select.Option key={classification.id} value={classification.id}>
                  {classification.type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={t('password')}
            name="password"
            rules={[{ required: true, message: t('passwordRequired') }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              {editingUser ? t('editUser') : t('addUser')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Users;