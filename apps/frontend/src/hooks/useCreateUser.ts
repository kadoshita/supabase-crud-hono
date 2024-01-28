import { useState } from 'react';
import { ApiClient } from '../libs/api';

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
    const client = new ApiClient(idToken);
    client
      .createUser({
        name,
      })
      .then((data) => setUser(data));
  };

  return [user, createUser];
};
