export interface User {
    number: string;
    userId: number;
    name: string;
    plan: 'free' | 'no' | 'silver' | 'gold' | 'platinum';
    planUpdatedAt: string;
    password: string;
}

