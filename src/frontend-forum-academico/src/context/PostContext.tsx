'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiPost, NewPost } from "@/commom/interfaces/postProps";
import { headers } from 'next/headers';

interface PostContextType {
  getPosts: () => void;
  getMyPosts: () => void;
  createPost: (newPost:NewPost) => void;
  likePost: (postId: string) => Promise<void>
  posts: ApiPost[];
  myPosts: ApiPost[];
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<[]>([]);
    const [myPosts, setMyPosts] = useState<[]>([]);

    const likePost = async (postId: string) => {
        try {
            const token = localStorage.getItem('acessToken');
            const response: any = await axios.post(`http://localhost:8000/like_post/${postId}`,{headers:{
                "Authorization": `Bearer ${token}`,
            }});
            await getPosts();

        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                toast.error("Credenciais inválidas!"); 
                router.push('/login');
            } else {
                toast.error("Ocorreu um erro ao tentar curtir o post. Por favor, tente novamente."); 
            }
        }
    }

    const getPosts = useCallback(async () => {
        try {
            const token = localStorage.getItem('acessToken');
            const response: any = await axios.get(`http://localhost:8000/posts/${page}`,{headers:{
                "Authorization": `Bearer ${token}`,
            }});
            setPosts(response.data);
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                toast.error("Credenciais inválidas!"); 
                router.push('/login');
            } else {
                toast.error("Ocorreu um erro ao tentar carregar os posts. Por favor, tente novamente."); 
            }
        }
    }, []);

    const getMyPosts = useCallback(async () => {
        try {
            const token = localStorage.getItem('acessToken');
            const response: any = await axios.get(`http://localhost:8000/user_posts`,{headers:{
                "Authorization": `Bearer ${token}`,
            }});
            setMyPosts(response.data);
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                toast.error("Credenciais inválidas!"); 
                router.push('/login');
            } else {
                toast.error("Ocorreu um erro ao carregar os seus posts. Tente novamente."); 
            }
        }
    }, []);

    const createPost = async (newPost:NewPost)=>{
        try {
            const token = localStorage.getItem('acessToken');
            const response: any = await axios.post(`http://localhost:8000/post`, newPost, {headers:{
                "Authorization": `Bearer ${token}`,
            }});
            if (response.status === 201) {
                await getPosts();
                toast.success("Post criado com sucesso!");
                return;
            }
            toast.error("Algo deu errado. Tente novamente.");
            console.error(response);
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                toast.error("Credenciais inválidas!"); 
                router.push('/login');
            } else {
                toast.error("Ocorreu um erro ao carregar os seus posts. Tente novamente."); 
            }
        }
    }

    return (
        <PostContext.Provider value={{ getPosts, getMyPosts, posts, myPosts, createPost, likePost }}>
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
