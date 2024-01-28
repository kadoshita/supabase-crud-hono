import { useState } from 'react';
import { ApiClient } from '../libs/api';

export const useDeleteUser = (): [
  string | undefined,
  (args: { id: string; idToken: string }) => void
] => {
  const [result, setResult] = useState<string>();

  const deleteUser = ({ id, idToken }: { id: string; idToken: string }) => {
    const client = new ApiClient(idToken);
    client.deleteUser(id).then(() => setResult(id));
  };

  return [result, deleteUser];
};
