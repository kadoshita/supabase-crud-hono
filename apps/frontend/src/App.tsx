import { useEffect } from 'react';
import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import './App.css';
import UserInputForm from './components/form/UserInputForm';
import UsersTable from './components/table/UsersTable';
import { useFetchUsers } from './hooks/useFetchUsers';
import { useCreateUser } from './hooks/useCreateUser';
import { useDeleteUser } from './hooks/useDeleteUser';

function App() {
  const [users, fetchUsers] = useFetchUsers();
  const [newUser, createUser] = useCreateUser();
  const [result, deleteUser] = useDeleteUser();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!newUser) {
      return;
    }

    fetchUsers();
  }, [newUser, result]);

  const handleFormSubmit = ({ name }: { name: string }) => {
    createUser({ name });
  };

  const handleDeleteItem = (id: string) => {
    deleteUser({ id });
  };

  return (
    <MantineProvider>
      <h1>Supabase CURD</h1>
      <UserInputForm handleSubmit={handleFormSubmit}></UserInputForm>
      <UsersTable elements={users} handleDelete={handleDeleteItem}></UsersTable>
    </MantineProvider>
  );
}

export default App;
