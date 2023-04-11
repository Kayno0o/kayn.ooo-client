import React from 'react';
import Container from '../components/base/Container';
import GetUser, { GetUserProps } from '../components/auth/GetUser';
import Meta from '../components/base/Meta';

const Home = (props: GetUserProps) => {
  return (
    <>
      <Meta title="Home" />

      <Container className="flex flex-col gap-8">
        <h1 className="text-center text-2xl">Full-stack web developer</h1>

        {props.user && <p>You are logged in as {props.user.email}</p>}
      </Container>
    </>
  );
};

export default GetUser(Home);
