import { Injectable } from '@angular/core';
import { PaymentDocument } from '../../types/payment-document.type';
import { PaymentSource } from '../../types/payment-source.type';
import { Payment } from '../../types/payment.type';
import { PaymentDetails } from '../../types/payment-details.type';
import { PurchasedInvoice } from '../../types/purchased-invoice.type';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor() {}

  async getPaymentDocuments(paymentId: number | null): Promise<IApiResponse<PaymentDocument[]>> {
    if (paymentId === null) {
      return this.getMockIApiResponse(this.getMockPaymentDocuments());
    }
    return this.getMockIApiResponse(this.getMockAppliedPaymentDocuments(paymentId));
  }

  async getPaymentSources(): Promise<IApiResponse<PaymentSource[]>> {
    const result = await this.getMockIApiResponse(this.getMockPaymentSources());
    result.data.unshift({ name: 'Pick the Payment Source', value: -1 });
    return result;
  }

  async createPayment(payload: Payment): Promise<IApiResponse<boolean>> {
    return this.getMockIApiResponse(true);
  }

  async getPayment(paymentId: number): Promise<IApiResponse<Payment>> {
    return this.getMockIApiResponse(
      this.getMockPayment()
    );
  }

  async getPaymentDetails(paymentId: number): Promise<IApiResponse<PaymentDetails>> {
    return this.getMockIApiResponse(
      this.getMockPaymentDetails()
    );
  }

  async getAvailableInvoices(paymentId: number): Promise<IApiResponse<PurchasedInvoice[]>> {
    return this.getMockIApiResponse(
      this.getMockAvailableInvoices(paymentId)
    );
  }

  async getAppliedInvoices(paymentId: number): Promise<IApiResponse<PurchasedInvoice[]>> {
    return this.getMockIApiResponse(
      this.getMockAppliedInvoices(paymentId)
    );
  }

  public getMockIApiResponse<T>(data: T): IApiResponse<T> {
    return {
      statusCode: 200,
      message: '',
      isSuccessful: true,
      data,
      exception: {},
      errors: [],
    };
  }

  private getMockPaymentDocuments(): PaymentDocument[] {
    return [
      {
        iD: 60,
        fileName: 'unbranded.pdf',
        storageUrl: 'http://gustave.name',
      },
      {
        iD: 81,
        fileName: 'consultant_plains.pdf',
        storageUrl: 'http://bernice.name',
      },
      {
        iD: 38,
        fileName: 'infrastructure_navigate_automotive.pdf',
        storageUrl: 'http://dereck.com',
      },
      {
        iD: 83,
        fileName: 'optical_money.pdf',
        storageUrl: 'https://henri.org',
      },
      {
        iD: 34,
        fileName: 'berkshire_mandatory_tcp.pdf',
        storageUrl: 'https://kamron.biz',
      },
      {
        iD: 96,
        fileName: 'architect_won.pdf',
        storageUrl: 'http://rey.com',
      },
      {
        iD: 9,
        fileName: 'systemic_e_business.pdf',
        storageUrl: 'https://cristopher.net',
      },
      {
        iD: 61,
        fileName: 'auxiliary.pdf',
        storageUrl: 'http://osborne.org',
      },
      {
        iD: 37,
        fileName: 'navigating.pdf',
        storageUrl: 'http://linnie.name',
      },
      {
        iD: 84,
        fileName: 'haptic_gb.pdf',
        storageUrl: 'http://meredith.info',
      },
    ];
  }

  private getMockPaymentSources(): PaymentSource[] {
    return [
      { name: 'Customer', value: 0 },
      { name: 'Client', value: 1 },
      { name: 'Atradius', value: 2 },
    ];
  }

  private getMockPayment(): Payment {
    return {
      "iD": 123,
      "paymentSourceID": 456,
      "clientID": 789,
      "paymentNumber": "PAY-2024-001",
      "paymentDate": new Date("2024-07-30T00:00:00Z"),
      "paymentAmount": 1500.75,
      "paymentStatusID": 2,
      "paymentMethodID": 3,
      "balance": 0.00,
      "reversalDate": null,
      "reversalReasonID": null,
      "clientCustomerID": 321,
      "notes": "Payment for invoice #12345",
      "sourceFundingTransactionID": 654,
      "transactionKey": 987
    };    
  }

  private getMockPaymentDetails(): PaymentDetails {
    return {
      "customerName": "John Doe",
      "customerFullAddress": "123 Elm Street, Springfield, IL 62704, USA",
      
      "clientName": "ACME Corp.",
      "clientFullAddress": "456 Oak Avenue, Metropolis, NY 10001, USA",
      
      "paymentMethodId": 1,
      "checkNumber": "123456",
      "checkDate": new Date("2024-07-30T00:00:00Z"),
      "checkAmount": 1500.75,
      "payor": "John Doe",
      "payerRefId": 78910,
      
      "bankNumber": "987654321",
      "bankBranch": "Central Bank, Downtown Branch",

      payment: this.getMockPayment(),
    };  
  }

  private getMockAppliedPaymentDocuments(paymentId: number): PaymentDocument[] {
    return [
      {
        iD: 60,
        fileName: 'unbranded.pdf',
        storageUrl: 'http://gustave.name',
      },
      {
        iD: 81,
        fileName: 'consultant_plains.pdf',
        storageUrl: 'http://bernice.name',
      },
      {
        iD: 38,
        fileName: 'infrastructure_navigate_automotive.pdf',
        storageUrl: 'http://dereck.com',
      },
    ];
  }

  private getMockAvailableInvoices(paymentId: number): PurchasedInvoice[] {
    return [
      {
        "invoiceNumber": "34025179",
        "approvedAmount": 564.73,
        "balance": 852.47,
        "purchaseDate": new Date("2023-08-24T20:34:00.039Z"),
        "dPD": 319,
        "storageUrl": "http://norris.info"
      },
      {
        "invoiceNumber": "95765587",
        "approvedAmount": 643.63,
        "balance": 718.68,
        "purchaseDate": new Date("2024-04-01T03:07:30.330Z"),
        "dPD": 256,
        "storageUrl": "https://brook.net"
      },
      {
        "invoiceNumber": "36332806",
        "approvedAmount": 60.97,
        "balance": 436.5,
        "purchaseDate": new Date("2024-07-15T14:53:03.018Z"),
        "dPD": 271,
        "storageUrl": "https://macie.net"
      },
      {
        "invoiceNumber": "12705723",
        "approvedAmount": 51.87,
        "balance": 959.26,
        "purchaseDate": new Date("2023-10-14T05:58:59.465Z"),
        "dPD": 126,
        "storageUrl": "http://cornell.name"
      },
      {
        "invoiceNumber": "63250570",
        "approvedAmount": 708.31,
        "balance": 121.55,
        "purchaseDate": new Date("2024-01-05T11:11:20.244Z"),
        "dPD": 131,
        "storageUrl": "http://casimir.com"
      },
      {
        "invoiceNumber": "82744875",
        "approvedAmount": 341.04,
        "balance": 713.74,
        "purchaseDate": new Date("2024-01-18T14:17:10.219Z"),
        "dPD": 68,
        "storageUrl": "https://gia.name"
      },
      {
        "invoiceNumber": "40223097",
        "approvedAmount": 444.29,
        "balance": 618.62,
        "purchaseDate": new Date("2024-03-25T20:03:00.219Z"),
        "dPD": 280,
        "storageUrl": "https://sherwood.biz"
      },
      {
        "invoiceNumber": "92287337",
        "approvedAmount": 145.83,
        "balance": 823.29,
        "purchaseDate": new Date("2024-03-14T19:56:48.229Z"),
        "dPD": 267,
        "storageUrl": "http://domenico.name"
      },
      {
        "invoiceNumber": "77550627",
        "approvedAmount": 28.89,
        "balance": 805.09,
        "purchaseDate": new Date("2023-10-15T12:09:49.511Z"),
        "dPD": 240,
        "storageUrl": "http://chanel.net"
      },
      {
        "invoiceNumber": "75023602",
        "approvedAmount": 333.14,
        "balance": 370.65,
        "purchaseDate": new Date("2024-03-19T22:04:44.683Z"),
        "dPD": 159,
        "storageUrl": "https://maximillia.info"
      }
    ];
  }

  private getMockAppliedInvoices(paymentId: number): PurchasedInvoice[] {
    return [
      {
        "invoiceNumber": "24181734",
        "approvedAmount": 333.16,
        "balance": 556.21,
        "purchaseDate": new Date("2023-10-01T11:28:11.524Z"),
        "dPD": 318,
        "storageUrl": "https://emily.name"
      },
      {
        "invoiceNumber": "17021127",
        "approvedAmount": 462.67,
        "balance": 294.66,
        "purchaseDate": new Date("2024-06-14T15:07:58.936Z"),
        "dPD": 39,
        "storageUrl": "http://armando.info"
      },
      {
        "invoiceNumber": "08094362",
        "approvedAmount": 104.11,
        "balance": 366.21,
        "purchaseDate": new Date("2023-10-30T07:42:50.075Z"),
        "dPD": 296,
        "storageUrl": "http://noemy.name"
      },
      {
        "invoiceNumber": "02474161",
        "approvedAmount": 140.33,
        "balance": 105.99,
        "purchaseDate": new Date("2023-08-31T20:10:31.249Z"),
        "dPD": 77,
        "storageUrl": "https://reuben.name"
      },
      {
        "invoiceNumber": "97155152",
        "approvedAmount": 279.78,
        "balance": 476.05,
        "purchaseDate": new Date("2023-08-11T01:21:40.367Z"),
        "dPD": 177,
        "storageUrl": "http://fanny.net"
      },
      {
        "invoiceNumber": "66680569",
        "approvedAmount": 155.23,
        "balance": 40.26,
        "purchaseDate": new Date("2024-06-29T21:59:07.780Z"),
        "dPD": 206,
        "storageUrl": "https://sven.org"
      },
      {
        "invoiceNumber": "85670853",
        "approvedAmount": 829.59,
        "balance": 779.7,
        "purchaseDate": new Date("2024-05-18T20:23:30.134Z"),
        "dPD": 301,
        "storageUrl": "https://susanna.com"
      },
      {
        "invoiceNumber": "42467549",
        "approvedAmount": 56.62,
        "balance": 231.72,
        "purchaseDate": new Date("2023-12-23T05:54:52.602Z"),
        "dPD": 360,
        "storageUrl": "https://claudie.info"
      },
      {
        "invoiceNumber": "93632079",
        "approvedAmount": 578.25,
        "balance": 131.2,
        "purchaseDate": new Date("2024-02-06T16:16:58.067Z"),
        "dPD": 141,
        "storageUrl": "https://judy.net"
      },
      {
        "invoiceNumber": "93121124",
        "approvedAmount": 219.59,
        "balance": 962.74,
        "purchaseDate": new Date("2024-06-17T12:54:48.196Z"),
        "dPD": 226,
        "storageUrl": "https://alice.net"
      }
    ];
  }
}

export interface IApiResponse<T = any> {
  statusCode: number; // 400 client-side failure -> show in UI for validation
  message: string;
  isSuccessful: boolean;
  data: T;
  exception: object;
  errors: any[]; // list of errors with specfic messages, use for client-side errors
}
