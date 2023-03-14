import React, { ReactElement } from 'react';
import { Footer } from './inc/Footer';
import { Header } from './inc/Header';

export type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout(props: LayoutProps): ReactElement {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />

      <div className="mt-12">{props.children}</div>

      <Footer />
    </div>
  );
}
