import { Link, useLocation } from 'wouter';
import LoginForm from '../components/form/LoginForm';
import { useLogin } from '../hooks/useLogin';
import { useEffect } from 'react';

export default function Login() {
  const [session, login] = useLogin();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (session) {
      setLocation('/');
    }
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    login(values.email, values.password);
  };

  return (
    <>
      <h1>Login</h1>
      <LoginForm handleSubmit={handleSubmit}></LoginForm>
      <Link href="/signup">
        <a className="link">Signup</a>
      </Link>
    </>
  );
}
