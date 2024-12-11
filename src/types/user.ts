export interface User {
    id: number;
    userName: string;
    email: string;
    password: string;
    createdAt: Date;
    roles?: Role[];
    tokens?: Token[];
}

export interface Role {
    id: number;
    name: string;
}
  

export interface Token {
    id: number;
    token: string;
    createdAt: Date;
    expiresAt: Date;
    userId: number;
}

export interface RegisterData {
    userName: string;
    email: string;
    password: string;
    role: string;
}

export interface LoginData {
    email: string;
    password: string;
}