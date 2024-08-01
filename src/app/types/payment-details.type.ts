import { Payment } from "./payment.type";

export type PaymentDetails = {
    customerName: string | null;
    customerFullAddress: string;

    clientName: string | null;
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