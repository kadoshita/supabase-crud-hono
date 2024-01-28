import { useEffect } from 'react';
import LoginForm from '../components/form/LoginForm';
import { useSignup } from '../hooks/useSignup';
import { useLocation } from 'wouter';

export default function Signup() {
  const [session, signup] = useSignup();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (session) {
      setLocation('/');
    }
  }, [session]);

  const handleSubmit = (values: { email: string; password: string }) => {
    signup(values.email, values.password);
  };

  return (
    <>
      <h1>Signup</h1>
      <LoginForm handleSubmit={handleSubmit}></LoginForm>
    </>
  );
}
