import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type User = {
  id: string;
  name: string;
};

export const useCreateUser = (): [
  User | undefined,
  (args: { name: string; idToken: string }) => void
] => {
  const [user, setUser] = useState<User>();

  const createUser = ({ name, idToken }: { name: string; idToken: string }) => {
    fetch(`${API_BASE_URL}/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  };

  return [user, createUser];
};
