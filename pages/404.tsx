import React from 'react';
import Container from '../components/base/Container';

const Page404 = () => (
  <Container className="flex h-full flex-col items-center justify-center gap-6">
    <img className="max-w-lg" src="/cat-search.gif" alt="Black cat looking around" />

    <h1>404: This page could not be found...</h1>
  </Container>
);

export default Page404;
