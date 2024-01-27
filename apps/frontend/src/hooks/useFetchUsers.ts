import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type User = {
  id: string;
  name: string;
};

export const useFetchUsers = (): [User[], () => void] => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = () => {
    fetch(`${API_BASE_URL}/api/v1/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  return [users, fetchUsers];
};
