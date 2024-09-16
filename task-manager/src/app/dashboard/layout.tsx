'use client';
import React, { ReactNode } from 'react';
import { TeamsProvider } from './TeamsContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <TeamsProvider>
      <div>{children}</div>
    </TeamsProvider>
  );
};

export default Layout;