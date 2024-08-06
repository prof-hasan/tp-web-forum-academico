'use client'
import axios from 'axios';
import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email:string, password:string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email:string, password:string) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    const response:Response = await axios.post('http://localhost:8000/login', formData);

    if (response.status === 200){
        setIsAuthenticated(true);
        console.log(response.body);
    }else{
        console.log("Deu ruim");
        setIsAuthenticated(false);
    }
  };
  const logout = () => setIsAuthenticated(false);


  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
