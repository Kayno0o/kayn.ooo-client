import React from 'react';
import Container from '../components/base/Container';
import H1 from '../components/base/H1';

type ErrorProps = {
  children: React.ReactNode;
  code: string;
  src: string;
};

const Error = (props: ErrorProps) => (
  <Container className="flex h-full flex-col items-center justify-center gap-6" title={props.code} noindex>
    <H1 className="text-center">
      Error <span className="text-red-400">{props.code}</span>
    </H1>

    <img className="w-full max-w-lg" src={props.src} alt="Black cat looking around" />

    <p>{props.children}</p>
  </Container>
);

export default Error;
