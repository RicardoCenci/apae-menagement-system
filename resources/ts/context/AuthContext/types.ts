export namespace AuthTypes {
    export type User = {
        id: number;
        name: string;
    }

    export type AuthState = {
        user: User | null;
        token: string | null;
    }
    
    
}