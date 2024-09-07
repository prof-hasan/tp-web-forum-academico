interface User {
    id: string;
    created_at: string;
    deleted_at: string | null;
    deleted_by: string | null;
    name: string;
    email: string;
    password: string;
    role: string;
}
type UserKeys = keyof User;
export default User;
export type { UserKeys };