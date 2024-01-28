import { useEffect } from 'react';
import UserInputForm from '../components/form/UserInputForm';
import UsersTable from '../components/table/UsersTable';
import { useCreateUser } from '../hooks/useCreateUser';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { useFetchUsers } from '../hooks/useFetchUsers';
import { useSession } from '../hooks/useSession';
import { Link, useLocation } from 'wouter';

export default function Index() {
  const [users, fetchUsers] = useFetchUsers();
  const [newUser, createUser] = useCreateUser();
  const [result, deleteUser] = useDeleteUser();
  const [session, getSession] = useSession();
  const [_location, setLocation] = useLocation();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        setLocation('/login');
      } else {
        fetchUsers({ idToken: session.access_token });
      }
    });
  }, []);

  useEffect(() => {
    if (!newUser || !session) {
      return;
    }

    fetchUsers({ idToken: session.access_token });
  }, [newUser, result]);

  const handleFormSubmit = ({ name }: { name: string }) => {
    if (!session) {
      return;
    }
    createUser({ name, idToken: session.access_token });
  };

  const handleDeleteItem = (id: string) => {
    if (!session) {
      return;
    }
    deleteUser({ id, idToken: session.access_token });
  };

  return (
    <>
      <h1>Supabase CURD</h1>
      <UserInputForm handleSubmit={handleFormSubmit}></UserInputForm>
      <UsersTable elements={users} handleDelete={handleDeleteItem}></UsersTable>
      <Link href="/logout">
        <a className="link">Logout</a>
      </Link>
    </>
  );
}
