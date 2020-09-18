export interface Address {
    id: number;
    street: string;
    number: number;
    city: string;
    state: string;
    zipCode: string;
    complement: string;
    mainAddress: boolean;
    createdAt: Date;
    updatedAt: Date;
    customerId: number;
}