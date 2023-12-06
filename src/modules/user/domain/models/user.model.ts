export interface User {
    id?: number;
    identification?: number | null,
    password: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    name: string;
    surname: string;
    gender?: string | null;
    role?: string;
    birthdate?: string | null;
}