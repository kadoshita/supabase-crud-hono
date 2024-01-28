import { Link, useLocation } from 'wouter';
import LoginForm, { SubmitValues } from '../components/form/LoginForm';
import { useLogin } from '../hooks/useLogin';
import { useEffect } from 'react';

export default function Login() {
  const [session, loginWithEmail, loginWithOAuth] = useLogin();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (session) {
      setLocation('/');
    }
  });

  const handleSubmit = (values: SubmitValues) => {
    switch (values.type) {
      case 'email':
        loginWithEmail(values.email, values.password);
        break;
      case 'github':
      case 'google':
        loginWithOAuth(values.type);
        break;
    }
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
