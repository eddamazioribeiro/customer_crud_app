import { Address } from './Address';

export interface Customer {
    id: number;
    name: string;
    eMail: string;
    createdAt: Date;
    updatedAt: Date;
    addresses: Address[];
}
