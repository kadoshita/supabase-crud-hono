import { useEffect } from 'react';
import LoginForm, { SubmitValues } from '../components/form/LoginForm';
import { useSignup } from '../hooks/useSignup';
import { useLocation } from 'wouter';

export default function Signup() {
  const [session, signupWithEmail, signupWithOAuth] = useSignup();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (session) {
      setLocation('/');
    }
  }, [session]);

  const handleSubmit = (values: SubmitValues) => {
    switch (values.type) {
      case 'email':
        signupWithEmail(values.email, values.password);
        break;
      case 'github':
      case 'google':
        signupWithOAuth(values.type);
        break;
    }
  };

  return (
    <>
      <h1>Signup</h1>
      <LoginForm handleSubmit={handleSubmit}></LoginForm>
    </>
  );
}
