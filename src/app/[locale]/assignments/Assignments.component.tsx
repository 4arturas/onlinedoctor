'use client';

import { Button, Popconfirm, Table, Form, Input } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Assignment {
  id: number;
  patientId: number;
  doctorId: number;
}

type AssignmentsProps = {
  assignments: Array<Assignment>;
  onAdd(assignment: { patientId: number; doctorId: number }): Promise<void>;
  onDelete(id: number): Promise<void>;
  onUpdate(id: number, assignment: { patientId: number; doctorId: number }): Promise<void>;
};

function Assignments({ assignments, onAdd, onDelete, onUpdate }: AssignmentsProps) {
  const t = useTranslations('Assignments');
  const [form] = Form.useForm();
  const [editingId, setEditingId] = React.useState<number | null>(null);

  function handleEdit(assignment: Assignment) {
    form.setFieldsValue({ patientId: assignment.patientId, doctorId: assignment.doctorId });
    setEditingId(assignment.id);
  }

  async function handleFinish(values: { patientId: number; doctorId: number }) {
    if (editingId) {
      await onUpdate(editingId, values);
      setEditingId(null);
      form.resetFields();
    } else {
      await onAdd(values);
      form.resetFields();
    }
  }

  return (
    <div>
      <Form form={form} layout="inline" onFinish={handleFinish}>
        <Form.Item name="patientId" rules={[{ required: true, message: t('patientIdRequired') }]}>
          <Input placeholder={t('patientId')} />
        </Form.Item>
        <Form.Item name="doctorId" rules={[{ required: true, message: t('doctorIdRequired') }]}>
          <Input placeholder={t('doctorId')} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            {editingId ? t('updateAssignment') : t('addAssignment')}
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={assignments} rowKey="id">
        <Table.Column dataIndex="id" title={t('id')} />
        <Table.Column dataIndex="patientId" title={t('patientId')} />
        <Table.Column dataIndex="doctorId" title={t('doctorId')} />
        <Table.Column
          render={(_, assignment: Assignment) => (
            <>
              <Button onClick={() => handleEdit(assignment)}>{t('edit')}</Button>
              <Popconfirm onConfirm={() => onDelete(assignment.id)} title={t('confirmDelete')}>
                <Button type="link">{t('delete')}</Button>
              </Popconfirm>
            </>
          )}
          title={t('actions')}
        />
      </Table>
    </div>
  );
}

export default Assignments;