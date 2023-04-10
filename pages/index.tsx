import React from 'react';
import Container from '../components/base/Container';
import GetUser, { GetUserProps } from '../components/auth/GetUser';

const Home = (props: GetUserProps) => {
  return (
    <Container className="flex flex-col gap-8" title="Home">
      <h1 className="text-center text-2xl">Full-stack web developer</h1>

      {props.user && <p>You are logged in as {props.user.email}</p>}
    </Container>
  );
};

export default GetUser(Home);
