'use client'
import User from '@/commom/interfaces/user';
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
  getMyUser: () => Promise<void>;
  myUser: User|undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [myUser, setMyUser] = useState<User>();
    const router = useRouter();

    const getMyUser = async ()=>{
        try {
            const token = localStorage.getItem('acessToken');
            const response: any = await axios.get('http://localhost:8000/my_user',{headers:{
                "Authorization": `Bearer ${token}`
            }});
            console.log(response);

            if (response.status === 200) {
                setMyUser(response.data)
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                toast.error("Credenciais inválidas!"); 
                router.push('/login');
            } else {
                toast.error("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente."); 
            }
        }
    }

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
                await getMyUser();
                router.push('/latestPosts'); 
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
        <AuthContext.Provider value={{ isAuthenticated, myUser, login, logout, createUser, getMyUser}}>
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
