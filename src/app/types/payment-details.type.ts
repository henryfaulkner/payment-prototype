import { Payment } from "./payment.type";

export type PaymentDetails = {
    customerName: string;
    customerFullAddress: string;

    clientName: string;
    clientFullAddress: string;

    paymentMethodId: number;
    checkNumber: string;
    checkDate: Date;
    checkAmount: number;
    payor: string;
    payerRefId: number;

    bankNumber: string;
    bankBranch: string;

    payment: Payment | null;
};