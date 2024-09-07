'use client';

import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Users from './Users.component';

interface User {
  id: number;
  email: string;
  name: string;
  lastname: string;
  classificationId: number;
}

function UsersPage(): React.ReactElement {
  const [users, setUsers] = useState<Array<User>>([]);

  async function fetchUsers(): Promise<void> {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      message.error('Failed to fetch users');
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleAdd(user: { email: string; name: string; lastname: string; classificationId: number }): Promise<void> {
    const response = await axios.post('/api/users', user);
    setUsers((prev) => [...prev, response.data]);
  }

  async function handleUpdate(id: number, user: { email: string; name: string; lastname: string; classificationId: number }): Promise<void> {
    const response = await axios.put(`/api/users/${id}`, user);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? response.data : u))
    );
  }

  async function handleDelete(id: number): Promise<void> {
    await axios.delete(`/api/users/${id}`);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  return (
    <main>
      <Users
        onAdd={handleAdd}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        users={users}
      />
    </main>
  );
}

export default UsersPage;