import React from 'react';
import Container from '../../components/base/Container';
import H1 from '../../components/base/H1';
import Button from '../../components/base/Button';
import { useRouter } from 'next/router';
import { User } from '../../types';
import UserApi from '../../utils/api/UserApi';
import IsGranted from '../../components/auth/IsGranted';

const AdminPage = ({ user }: { user: User }) => {
  const { push } = useRouter();

  const logout = () => {
    const userApi = new UserApi();

    userApi.logoutUser().then(() => {
      push('/admin/login');
    });
  };

  return (
    <Container noindex>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <H1>Admin Page</H1>
        <Button small onClick={() => logout()}>
          Logout
        </Button>
      </div>

      {user && user.email}
    </Container>
  );
};

export default IsGranted(AdminPage, 'ROLE_ADMIN');
