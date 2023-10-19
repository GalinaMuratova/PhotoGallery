export interface IUser {
    displayName: string;
    email: string;
    password: string;
    token: string;
    role: string;
    googleId?: string;
    avatar: string | null;
}