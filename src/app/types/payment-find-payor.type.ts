export type CustomerNameSearchTerms = {
    findCustomerName: string;
};

export type ClientNameSearchTerms = {
    findClientName: string;
};

export type InvoiceNumberSearchTerms = {
    findInvoiceNumber: string;
};

export class CustomerPaymentPayor {
    // selected items
    payorClientId: number;
    payorClientName: string;
    payorClientCustomerId: number;
    payorClientCustomerName: string;
};

export class ClientPaymentPayor {
    payorClientId: number;
    payorClientName: string;
};

export class ClientCustomerSearchWidgetResponse {
    // selected items
    clientId: number;
    clientName: string;
    clientCustomerId: number;
    clientCustomerName: string;
};

export type InvoiceNumberSearchWidgetResponse = {
    invoiceNumber: string;
    clientId: number;
    clientName: string;
    customerId: number;
    customerName: string;
    invoiceAmount: number;
    balance: number;
    reserveAmount: number;
    chargeAmount: number;
    approvedAmount: number;
    dPD: number;
    purchaseDate: Date;
};

// Atradius will skip step
// Atradius-system will be assumed 
export type AtradiusPaymnetPayorPayload = { };

export class AtradiusPaymentPayorResponseEntity {
    payorClientId: number;
    payorClientName: string;
};