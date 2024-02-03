import { useState } from 'react';
import { ApiClient } from '../libs/api';

export type User = {
  id: string;
  name: string;
};

export const useFetchUsers = (): [
  User[],
  (params: { idToken: string }) => void
] => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = ({ idToken }: { idToken: string }) => {
    const client = new ApiClient(idToken);
    client.getUsers().then((data) => setUsers(data ?? []));
  };

  return [users, fetchUsers];
};
