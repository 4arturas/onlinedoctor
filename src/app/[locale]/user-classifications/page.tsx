'use client';

import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserClassifications from './UserClassifications.component';

interface UserClassification {
    id: number;
    type: string;
}

function UserClassificationsPage(): React.ReactElement {
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

    async function handleAdd(classification: { type: string }): Promise<void> {
        const response = await axios.post('/api/user-classifications', classification);
        setClassifications((prev) => [...prev, response.data]);
    }

    async function handleUpdate(id: number, classification: { type: string }): Promise<void> {
        const response = await axios.put(`/api/user-classifications/${id}`, classification);
        setClassifications((prev) =>
          prev.map((c) => (c.id === id ? response.data : c))
        );
    }

    async function handleDelete(id: number): Promise<void> {
        await axios.delete(`/api/user-classifications/${id}`);
        setClassifications((prev) => prev.filter((c) => c.id !== id));
    }

    return (
      <main>
          <UserClassifications
            classifications={classifications}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
      </main>
    );
}

export default UserClassificationsPage;