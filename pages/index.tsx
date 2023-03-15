import React from 'react';
import type { NextPage } from 'next';
import Container from '../components/base/Container';

const Home: NextPage = () => {
  return (
    <Container className="flex flex-col gap-20">
      <h1 className="text-center text-2xl">Full-stack web developer</h1>
    </Container>
  );
};

export default Home;
