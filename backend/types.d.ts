export interface IUser {
    displayName: string;
    email: string;
    password: string;
    token: string;
    role: string;
    googleID?: string;
    avatar: string | null;
}