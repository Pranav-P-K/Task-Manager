'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Team {
  id: string;
  name: string;
  role: 'Team Leader' | 'Team Member';
}

interface TeamsContextType {
  teams: Team[];
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
}

const TeamsContext = createContext<TeamsContextType | undefined>(undefined);

interface TeamsProviderProps {
  children: ReactNode;
}

export const TeamsProvider: React.FC<TeamsProviderProps> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>([]);

  return (
    <TeamsContext.Provider value={{ teams, setTeams }}>
      {children}
    </TeamsContext.Provider>
  );
};

export const useTeams = (): TeamsContextType => {
  const context = useContext(TeamsContext);
};