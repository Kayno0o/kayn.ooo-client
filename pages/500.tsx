import React from 'react';
import Error from '../components/Error';

const Page404 = () => (
  <Error code="500" src="/500.jpg">
    Sorry about the technical difficulties! We&apos;re three kittens who love computers, but we couldn&apos;t fix the
    error 500 page. We&apos;ll keep trying though!
  </Error>
);

export default Page404;
