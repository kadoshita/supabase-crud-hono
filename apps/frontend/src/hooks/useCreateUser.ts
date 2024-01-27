import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type User = {
  id: string;
  name: string;
};

export const useCreateUser = (): [
  User | undefined,
  (args: { name: string }) => void
] => {
  const [user, setUser] = useState<User>();

  const createUser = ({ name }: { name: string }) => {
    fetch(`${API_BASE_URL}/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  };

  return [user, createUser];
};
