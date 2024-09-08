'use client';

import React from 'react';
import { Button, Table, Popconfirm, Form, Input } from 'antd';

interface Assignment {
  id: number;
  patientId: number;
  doctorId: number;
}

interface AssignmentsProps {
  assignments: Assignment[];
  onAdd: (assignment: { patientId: number; doctorId: number }) => Promise<void>;
  onUpdate: (id: number, assignment: { patientId: number; doctorId: number }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const Assignments: React.FC<AssignmentsProps> = ({ assignments, onAdd, onUpdate, onDelete }) => {
  const [form] = Form.useForm();
  const [editingId, setEditingId] = React.useState<number | null>(null);

  const handleEdit = (assignment: Assignment) => {
    form.setFieldsValue({ patientId: assignment.patientId, doctorId: assignment.doctorId });
    setEditingId(assignment.id);
  };

  const handleFinish = async (values: { patientId: number; doctorId: number }) => {
    if (editingId) {
      await onUpdate(editingId, values);
      setEditingId(null);
      form.resetFields();
    } else {
      await onAdd(values);
      form.resetFields();
    }
  };

  return (
    <div>
      <Form form={form} onFinish={handleFinish} layout="inline">
        <Form.Item name="patientId" rules={[{ required: true, message: 'Please input Patient ID!' }]}>
          <Input placeholder="Patient ID" />
        </Form.Item>
        <Form.Item name="doctorId" rules={[{ required: true, message: 'Please input Doctor ID!' }]}>
          <Input placeholder="Doctor ID" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingId ? 'Update Assignment' : 'Add Assignment'}
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={assignments} rowKey="id">
        <Table.Column title="ID" dataIndex="id" />
        <Table.Column title="Patient ID" dataIndex="patientId" />
        <Table.Column title="Doctor ID" dataIndex="doctorId" />
        <Table.Column
          title="Actions"
          render={(_, assignment) => (
            <>
              <Button onClick={() => handleEdit(assignment)}>Edit</Button>
              <Popconfirm title="Are you sure to delete this assignment?" onConfirm={() => onDelete(assignment.id)}>
                <Button type="link">Delete</Button>
              </Popconfirm>
            </>
          )}
        />
      </Table>
    </div>
  );
};

export default Assignments;