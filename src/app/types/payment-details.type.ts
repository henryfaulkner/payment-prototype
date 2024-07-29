export type PaymentDetails = {
    customerName: string;
    customerFullAddress: string;

    clientName: string;
    clientFullAddress: string;

    checkNumber: string;
    nPTF: string;
    checkDate: Date;
    checkAmount: number;
    payor: string;
    payerRefId: number;

    runningTotal: number;
    checkRunningDelta: number;

    bankNumber: string;
    bankBranch: string;
};