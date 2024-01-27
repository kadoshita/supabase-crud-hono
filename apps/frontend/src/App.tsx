import { useEffect } from 'react';
import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import './App.css';
import UserInputForm from './components/form/UserInputForm';
import UsersTable from './components/table/UsersTable';
import { useFetchUsers } from './hooks/useFetchUsers';
import { useCreateUser } from './hooks/useCreateUser';

function App() {
  const [users, fetchUsers] = useFetchUsers();
  const [newUser, createUser] = useCreateUser();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (newUser) {
      fetchUsers();
    }
  }, [newUser]);

  const handleFormSubmit = ({ name }: { name: string }) => {
    createUser({ name });
  };

  return (
    <MantineProvider>
      <h1>Supabase CURD</h1>
      <UserInputForm handleSubmit={handleFormSubmit}></UserInputForm>
      <UsersTable elements={users}></UsersTable>
    </MantineProvider>
  );
}

export default App;
