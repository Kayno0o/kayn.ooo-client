import React from 'react';

import Container from '../../components/base/Container';
import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import H1 from '../../components/base/H1';
import UserApi from '../../utils/api/UserApi';
import { useRouter } from 'next/router';

const AdminLoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { push } = useRouter();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError('');
    setLoading(true);

    const api = new UserApi();

    api
      .loginUser({ email, password })
      .then(() => {
        push('/admin');
      })
      .catch((error) => {
        setError(error.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container title="Admin Login" noindex>
      <H1>Admin Login Page</H1>

      <Form submitLabel="Login" className="pt-12" onSubmit={onSubmit} error={error} loading={loading}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          required
          placeholder="Enter email"
          resetError={() => setError('')}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          required
          placeholder="Enter password"
          resetError={() => setError('')}
        />
      </Form>
    </Container>
  );
};

export default AdminLoginPage;
