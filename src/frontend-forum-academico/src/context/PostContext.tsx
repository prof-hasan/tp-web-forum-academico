'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiPost } from "@/commom/interfaces/postProps";

interface PostContextType {
  getPosts: () => void;
  posts: ApiPost[];
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<[]>([]);


    const getPosts = async () => {
        try {
            const response: any = await axios.get(`http://localhost:8000/posts/${page}`);
            setPosts(response.data);
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                toast.error("Credenciais inválidas!"); 
            } else {
                toast.error("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente."); 
            }
        }
    };

    return (
        <PostContext.Provider value={{ getPosts, posts }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within an PostProvider');
  }
  return context;
};
