'use client';

import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Assignments from './Assignments.component';

interface Assignment {
  id: number;
  patientId: number;
  doctorId: number;
}

function AssignmentsPage(): React.ReactElement {
  const [assignments, setAssignments] = useState<Array<Assignment>>([]);

  async function fetchAssignments(): Promise<void> {
    try {
      const response = await axios.get('/api/assignments');
      setAssignments(response.data);
    } catch (error) {
      message.error('Failed to fetch assignments');
    }
  }

  useEffect(() => {
    fetchAssignments();
  }, []);

  async function handleAdd(assignment: { patientId: number; doctorId: number }): Promise<void> {
    const response = await axios.post('/api/assignments', assignment);
    setAssignments((prev) => [...prev, response.data]);
    message.success('Assignment created successfully');
  }

  async function handleUpdate(id: number, assignment: { patientId: number; doctorId: number }): Promise<void> {
    const response = await axios.put(`/api/assignments/${id}`, assignment);
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? response.data : a))
    );
    message.success('Assignment updated successfully');
  }

  async function handleDelete(id: number): Promise<void> {
    await axios.delete(`/api/assignments/${id}`);
    setAssignments((prev) => prev.filter((a) => a.id !== id));
    message.success('Assignment deleted successfully');
  }

  return (
    <main>
      <Assignments
        onAdd={handleAdd}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        assignments={assignments}
      />
    </main>
  );
}

export default AssignmentsPage;