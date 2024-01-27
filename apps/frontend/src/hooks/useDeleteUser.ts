import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useDeleteUser = (): [
  string | undefined,
  (args: { id: string }) => void
] => {
  const [result, setResult] = useState<string>();

  const deleteUser = ({ id }: { id: string }) => {
    fetch(`${API_BASE_URL}/api/v1/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }).then(() => setResult(id));
  };

  return [result, deleteUser];
};
