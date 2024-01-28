import { useLocation } from 'wouter';
import { useEffect } from 'react';
import { useLogout } from '../hooks/useLogout';

export default function Logout() {
  const logout = useLogout();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    logout().then(({ error }) => {
      if (!error) {
        setLocation('/login');
      }
    });
  }, []);

  return (
    <>
      <h1>Logout</h1>
    </>
  );
}
