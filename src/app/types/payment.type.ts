export type Payment = {
    iD: number; 
    paymentSourceID: number | null;
    clientID: number | null;
    paymentNumber: string | null;
    paymentDate: Date | null;
    paymentAmount: number | null;
    paymentStatusID: number | null;
    paymentMethodID: number | null;
    balance: number | null;
    reversalDate: Date | null;
    reversalReasonID: number | null;
    clientCustomerID: number | null;
    notes: string | null;
    sourceFundingTransactionID: number | null;
    transactionKey: number | null;
};