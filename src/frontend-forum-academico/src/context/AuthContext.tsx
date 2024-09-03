'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email:string, password:string) => void;
  logout: () => void;
  createUser: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    const login = async (email: string, password: string) => {
        try {
            const formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);
            const response: any = await axios.post('http://localhost:8000/login', formData);
            console.log(response);

            if (response.status === 200) {
                setIsAuthenticated(true);
                localStorage.setItem('acessToken', response.data.access_token);
                router.push('/myPosts'); 
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                toast.error("Credenciais inválidas!"); 
            } else {
                toast.error("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente."); 
            }
        }
    };
    const logout = () => setIsAuthenticated(false);


    const createUser = async (name:string,email: string, password: string) => {
        try {
            const body = {
                name,
                email,
                password
            }
            const response: any = await axios.post('http://localhost:8000/user', body);
            console.log(response);

            if (response.status === 201) {
                router.push('/login'); 
            }
        } catch (error: any) {
            toast.error("Ocorreu um erro ao tentar criar usuario. Por favor, tente novamente."); 
        }
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, createUser }}>
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
