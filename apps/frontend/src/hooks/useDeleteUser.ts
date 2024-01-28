import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useDeleteUser = (): [
  string | undefined,
  (args: { id: string; idToken: string }) => void
] => {
  const [result, setResult] = useState<string>();

  const deleteUser = ({ id, idToken }: { id: string; idToken: string }) => {
    fetch(`${API_BASE_URL}/api/v1/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({}),
    }).then(() => setResult(id));
  };

  return [result, deleteUser];
};
