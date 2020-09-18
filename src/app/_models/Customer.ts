import { Address } from './Address';

export interface Customer {
    id: number;
    name: string;
    eMail: string;
    birthDate: Date;
    createdAt: Date;
    updatedAt: Date;
    addresses: Address[];
}
