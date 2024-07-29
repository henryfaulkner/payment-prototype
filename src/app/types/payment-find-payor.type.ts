export type CustomerPaymentPayorPayload = {
    // payor terms
    findInvoiceNumber: string;
    findClientName: string;
    findCustomerName: string;
};

export class CustomerPaymentPayorResponseEntity {
    // selected items
    payorClientId: number;
    payorClientName: string;
    payorClientCustomerId: number;
    payorClientCustomerName: string;
};

export type ClientPaymentPayorPayload = {
    findInvoiceNumber: string;
    findClientName: string;
};

export class ClientPaymentPayorResponseEntity {
    payorClientId: number;
    payorClientName: string;
};

// Atradius will skip step
// Atradius-system will be assumed 
export type AtradiusPaymnetPayorPayload = { };

export class AtradiusPaymentPayorResponseEntity {
    payorClientId: number;
    payorClientName: string;
};