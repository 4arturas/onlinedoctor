'use client';

import { Table, Button, Input, Modal, Form, message } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

interface UserClassification {
  id: number;
  type: string;
}

type UserClassificationsProps = {
  classifications: Array<UserClassification>;
  onAdd(classification: { type: string }): Promise<void>;
  onDelete(id: number): Promise<void>;
  onUpdate(id: number, classification: { type: string }): Promise<void>;
};

function UserClassifications({
                               classifications,
                               onAdd,
                               onDelete,
                               onUpdate,
                             }: UserClassificationsProps): React.ReactElement {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingClassification, setEditingClassification] = React.useState<UserClassification | null>(null);
  const [form] = Form.useForm();
  const t = useTranslations('UserClassifications');

  async function handleSubmit(values: { type: string }): Promise<void> {
    try {
      if (editingClassification) {
        await onUpdate(editingClassification.id, values);
        message.success(t('classificationUpdated'));
      } else {
        await onAdd(values);
        message.success(t('classificationCreated'));
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingClassification(null);
    } catch (error) {
      message.error(t('classificationSaveFailed'));
    }
  }

  function openModal(classification?: UserClassification): void {
    setEditingClassification(classification || null);
    if (classification) {
      form.setFieldsValue({ type: classification.type });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  }

  const columns = [
    {
      dataIndex: 'id',
      key: 'id',
      title: t('id'),
    },
    {
      dataIndex: 'type',
      key: 'type',
      title: t('type'),
    },
    {
      key: 'actions',
      render: (text: string, record: UserClassification) => (
        <span>
          <Button onClick={() => openModal(record)} style={{ marginRight: 8 }} type="primary">
            {t('edit')}
          </Button>
          <Button danger onClick={() => onDelete(record.id)} type="primary">
            {t('delete')}
          </Button>
        </span>
      ),
      title: t('actions'),
    },
  ];

  return (
    <div>
      <h1>{t('title')}</h1>
      <Button onClick={() => openModal()} style={{ marginBottom: 16 }} type="primary">
        {t('addClassification')}
      </Button>
      <Table columns={columns} dataSource={classifications} rowKey="id" />

      <Modal
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        open={isModalOpen}
        title={editingClassification ? t('editClassification') : t('addClassification')}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label={t('classificationType')}
            name="type"
            rules={[{ required: true, message: t('classificationTypeRequired') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              {editingClassification ? t('classificationUpdated') : t('classificationCreated')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UserClassifications;