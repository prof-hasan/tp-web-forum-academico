interface PostProps {
    author: string;
    date: string;
    content: string;
    likes: number;
    comments: number;
}

interface ApiPost {
    _id: string;       
    created_at: string;
    text: string;      
    title: string;     
    likes: string[];   
    saveds: string[];  
    user_name: string; 
}

interface NewPost {
    user_id: string;       
    text: string;      
    title: string;
}

export type { PostProps, ApiPost, NewPost };