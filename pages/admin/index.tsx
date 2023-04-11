import React from 'react';
import Container from '../../components/base/Container';
import H1 from '../../components/base/H1';
import Button from '../../components/base/Button';
import { useRouter } from 'next/router';
import { User } from '../../types';
import UserApi from '../../utils/api/UserApi';
import IsGranted from '../../components/auth/IsGranted';
import Meta from '../../components/base/Meta';

const AdminPage = ({ user }: { user: User }) => {
  const { push } = useRouter();

  const logout = () => {
    const userApi = new UserApi();

    userApi.logoutUser().then(() => {
      push('/admin/login');
    });
  };

  return (
    <>
      <Meta noindex />

      <Container className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <H1>Admin Page</H1>
          <Button small onClick={() => logout()}>
            Logout
          </Button>
        </div>

        <p>Logged in as {user.email}</p>

        <div className="flex flex-wrap gap-8">
          <Button onClick={() => push('/admin/users')}>Users</Button>
          <Button onClick={() => push('/admin/translations')}>Translations</Button>
        </div>
      </Container>
    </>
  );
};

export default IsGranted(AdminPage, 'ROLE_ADMIN');
