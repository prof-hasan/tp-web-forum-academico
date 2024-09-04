'use client'
import { createContext, useContext, useState, ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';

interface SideBarContextType {
  tabIndex: number;
  changeTab: (index: number) => void;
}

const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [tabIndex, setTabIndex] = useState(0);

    const changeTab = (index: number) => {
        setTabIndex(index);
    }

    return (
        <SideBarContext.Provider value={{ tabIndex, changeTab }}>
        {children}
        </SideBarContext.Provider>
    );
};

export const useSideBar = () => {
  const context = useContext(SideBarContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
