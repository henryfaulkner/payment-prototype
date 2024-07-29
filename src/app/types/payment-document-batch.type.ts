import { PaymentDocument } from "./payment-document.type";

export type PaymentDocumentBatch = {
    paymentDocuments: PaymentDocument[];
    batchNotes: string;
};