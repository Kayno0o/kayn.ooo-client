import React, { useEffect, useState } from 'react';
import UserApi from '../../utils/api/UserApi';
import { User } from '../../types';

export type GetUserProps = {
  user: User | null;
};

const GetUser = (WrappedComponent: React.ComponentType<any>) => {
  const AuthWrapper = (props: any) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const userApi = new UserApi();

      userApi
        .fetchUser()
        .then((user) => {
          setUser(user);
        })
        .catch(() => {
          setUser(null);
        });
    }, []);

    return <WrappedComponent {...props} user={user} />;
  };

  return AuthWrapper;
};

export default GetUser;
