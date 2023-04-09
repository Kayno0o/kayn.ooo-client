import React from 'react';
import Container from '../../components/base/Container';
import RequireAuth from '../../components/auth/RequireAuth';
import { User } from '../../types';
import H1 from '../../components/base/H1';
import Button from '../../components/base/Button';
import UserApi from '../../utils/api/UserApi';
import { useRouter } from 'next/router';

const AdminPage = ({ user }: { user: User }) => {
  const { push } = useRouter();

  const logout = () => {
    const api = new UserApi();

    api.logoutUser().then(() => {
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

      {user.email}
    </Container>
  );
};

export default RequireAuth(AdminPage);
