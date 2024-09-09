export interface NewPostModalProps {
    onClose: () => void;
    onPost: (title:string, body:string) => void;
}