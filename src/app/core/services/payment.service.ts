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

  async getReleasedPayments(): Promise<IApiResponse<Payment[]>> {
    return this.getMockIApiResponse(
      this.getMockReleasedPayments()
    );
  }

  async getUnreleasedPayments(): Promise<IApiResponse<Payment[]>> {
    return this.getMockIApiResponse(
      this.getMockUnreleasedPayments()
    );
  }

  async getReleasedPaymentDetails(): Promise<IApiResponse<PaymentDetails[]>> {
    return this.getMockIApiResponse(
      this.getMockReleasedPaymentDetails()
    );
  }

  async getUnreleasedPaymentDetails(): Promise<IApiResponse<PaymentDetails[]>> {
    return this.getMockIApiResponse(
      this.getMockUnreleasedPaymentDetails()
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
      "reversalDate": new Date(null),
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

  private getMockReleasedPayments(): Payment[] {
    return [
      {
        "iD": 28870,
        "paymentSourceID": 70763,
        "clientID": null,
        "paymentNumber": null,
        "paymentDate": new Date(null),
        "paymentAmount": 709.72,
        "paymentStatusID": null,
        "paymentMethodID": null,
        "balance": 0,
        "reversalDate": new Date(null),
        "reversalReasonID": null,
        "clientCustomerID": 62972,
        "notes": null,
        "sourceFundingTransactionID": null,
        "transactionKey": 15994
      },
      {
        "iD": 87512,
        "paymentSourceID": null,
        "clientID": null,
        "paymentNumber": null,
        "paymentDate": new Date(null),
        "paymentAmount": 1564.76,
        "paymentStatusID": 1,
        "paymentMethodID": null,
        "balance": 0,
        "reversalDate": new Date("2024-02-29T00:14:14.052Z"),
        "reversalReasonID": null,
        "clientCustomerID": null,
        "notes": null,
        "sourceFundingTransactionID": 20249,
        "transactionKey": 93056
      },
      {
        "iD": 88318,
        "paymentSourceID": null,
        "clientID": null,
        "paymentNumber": "40106214",
        "paymentDate": new Date(null),
        "paymentAmount": 6671.55,
        "paymentStatusID": null,
        "paymentMethodID": 5,
        "balance": 0,
        "reversalDate": new Date("2023-08-07T06:42:43.442Z"),
        "reversalReasonID": 7,
        "clientCustomerID": null,
        "notes": "Placeat mollitia minus suscipit harum ut delectus earum ut.",
        "sourceFundingTransactionID": 90445,
        "transactionKey": 97193
      },
      {
        "iD": 16839,
        "paymentSourceID": 16720,
        "clientID": null,
        "paymentNumber": null,
        "paymentDate": new Date("2024-07-03T22:52:53.282Z"),
        "paymentAmount": 7878.16,
        "paymentStatusID": null,
        "paymentMethodID": null,
        "balance": 0,
        "reversalDate": new Date("2023-08-31T06:30:03.492Z"),
        "reversalReasonID": null,
        "clientCustomerID": 55669,
        "notes": null,
        "sourceFundingTransactionID": 23625,
        "transactionKey": 63152
      },
      {
        "iD": 6496,
        "paymentSourceID": null,
        "clientID": 81113,
        "paymentNumber": "96211468",
        "paymentDate": new Date(null),
        "paymentAmount": 7964.35,
        "paymentStatusID": null,
        "paymentMethodID": 9,
        "balance": 0,
        "reversalDate": new Date("2023-11-25T00:41:05.000Z"),
        "reversalReasonID": 3,
        "clientCustomerID": 91884,
        "notes": null,
        "sourceFundingTransactionID": 6064,
        "transactionKey": 19965
      },
      {
        "iD": 5978,
        "paymentSourceID": null,
        "clientID": 97478,
        "paymentNumber": "49975211",
        "paymentDate": new Date(null),
        "paymentAmount": 4730.55,
        "paymentStatusID": null,
        "paymentMethodID": null,
        "balance": 0,
        "reversalDate": new Date(null),
        "reversalReasonID": 7,
        "clientCustomerID": null,
        "notes": "Sed reiciendis nesciunt quibusdam natus aliquam deleniti iusto aut quos.",
        "sourceFundingTransactionID": null,
        "transactionKey": 30983
      },
      {
        "iD": 3299,
        "paymentSourceID": null,
        "clientID": null,
        "paymentNumber": "34465112",
        "paymentDate": new Date("2023-09-29T11:39:53.700Z"),
        "paymentAmount": 3156.92,
        "paymentStatusID": null,
        "paymentMethodID": null,
        "balance": 0,
        "reversalDate": new Date(null),
        "reversalReasonID": 7,
        "clientCustomerID": null,
        "notes": "Et repellat suscipit vel incidunt cumque rerum sit dolores.",
        "sourceFundingTransactionID": null,
        "transactionKey": 78410
      },
      {
        "iD": 34713,
        "paymentSourceID": null,
        "clientID": null,
        "paymentNumber": "44851708",
        "paymentDate": new Date(null),
        "paymentAmount": 2077.99,
        "paymentStatusID": 3,
        "paymentMethodID": null,
        "balance": 0,
        "reversalDate": new Date(null),
        "reversalReasonID": null,
        "clientCustomerID": null,
        "notes": "Quo autem aut dolorum nostrum itaque repellat expedita ducimus.",
        "sourceFundingTransactionID": null,
        "transactionKey": 70273
      },
      {
        "iD": 59190,
        "paymentSourceID": null,
        "clientID": 58467,
        "paymentNumber": null,
        "paymentDate": new Date(null),
        "paymentAmount": 6426.94,
        "paymentStatusID": null,
        "paymentMethodID": 9,
        "balance": 0,
        "reversalDate": new Date(null),
        "reversalReasonID": null,
        "clientCustomerID": 60810,
        "notes": "Voluptas quas voluptas dolorem quisquam ut.",
        "sourceFundingTransactionID": 7008,
        "transactionKey": 19495
      },
      {
        "iD": 30439,
        "paymentSourceID": 1106,
        "clientID": 60693,
        "paymentNumber": null,
        "paymentDate": new Date("2024-04-28T01:06:12.628Z"),
        "paymentAmount": 7052.97,
        "paymentStatusID": null,
        "paymentMethodID": null,
        "balance": 0,
        "reversalDate": new Date("2024-02-26T05:55:58.133Z"),
        "reversalReasonID": 10,
        "clientCustomerID": 57756,
        "notes": "Nobis error voluptates sed eligendi pariatur dolores eos.",
        "sourceFundingTransactionID": null,
        "transactionKey": 39976
      }
    ];
  }

  private getMockUnreleasedPayments(): Payment[] {
    return [
      {
        "iD": 47596,
        "paymentSourceID": null,
        "clientID": 15716,
        "paymentNumber": null,
        "paymentDate": new Date(null),
        "paymentAmount": 5299.69,
        "paymentStatusID": 5,
        "paymentMethodID": 3,
        "balance": 4118.9,
        "reversalDate": new Date(null),
        "reversalReasonID": 7,
        "clientCustomerID": 31562,
        "notes": "Iusto adipisci est cumque et ut inventore exercitationem ut.",
        "sourceFundingTransactionID": null,
        "transactionKey": 65728
      },
      {
        "iD": 2556,
        "paymentSourceID": null,
        "clientID": 56427,
        "paymentNumber": null,
        "paymentDate": new Date(null),
        "paymentAmount": 7840.93,
        "paymentStatusID": null,
        "paymentMethodID": 6,
        "balance": 4575.83,
        "reversalDate": new Date("2023-09-18T10:53:05.482Z"),
        "reversalReasonID": null,
        "clientCustomerID": null,
        "notes": "Porro et voluptatem.",
        "sourceFundingTransactionID": null,
        "transactionKey": 2806
      },
      {
        "iD": 12590,
        "paymentSourceID": null,
        "clientID": 23489,
        "paymentNumber": "02802281",
        "paymentDate": new Date(null),
        "paymentAmount": 1272.37,
        "paymentStatusID": 2,
        "paymentMethodID": null,
        "balance": 16.1,
        "reversalDate": new Date("2024-04-08T00:58:03.268Z"),
        "reversalReasonID": null,
        "clientCustomerID": 44197,
        "notes": "Nemo repellat eos rerum ratione animi reprehenderit officiis sint.",
        "sourceFundingTransactionID": 3770,
        "transactionKey": 94608
      },
      {
        "iD": 74415,
        "paymentSourceID": 84257,
        "clientID": 64989,
        "paymentNumber": "47516880",
        "paymentDate": new Date(null),
        "paymentAmount": 2037.64,
        "paymentStatusID": 1,
        "paymentMethodID": 10,
        "balance": 1042.22,
        "reversalDate": new Date("2024-04-12T17:17:40.464Z"),
        "reversalReasonID": 2,
        "clientCustomerID": 23543,
        "notes": null,
        "sourceFundingTransactionID": 73091,
        "transactionKey": 38564
      },
      {
        "iD": 8221,
        "paymentSourceID": 60366,
        "clientID": 61667,
        "paymentNumber": null,
        "paymentDate": new Date("2023-10-08T12:05:42.582Z"),
        "paymentAmount": 2841.84,
        "paymentStatusID": null,
        "paymentMethodID": null,
        "balance": 821.15,
        "reversalDate": new Date("2023-10-15T08:34:22.822Z"),
        "reversalReasonID": null,
        "clientCustomerID": 86904,
        "notes": "Quia dignissimos omnis molestias facilis dicta vel est repellat.",
        "sourceFundingTransactionID": 57273,
        "transactionKey": 88726
      },
      {
        "iD": 26778,
        "paymentSourceID": 24296,
        "clientID": 60157,
        "paymentNumber": null,
        "paymentDate": new Date(null),
        "paymentAmount": 5851.73,
        "paymentStatusID": 2,
        "paymentMethodID": null,
        "balance": 2709.38,
        "reversalDate": new Date("2023-11-27T13:26:19.198Z"),
        "reversalReasonID": 3,
        "clientCustomerID": null,
        "notes": "Repellat sed fugiat hic voluptatem placeat quia.",
        "sourceFundingTransactionID": 30836,
        "transactionKey": 66774
      },
      {
        "iD": 9655,
        "paymentSourceID": 14474,
        "clientID": 83028,
        "paymentNumber": null,
        "paymentDate": new Date("2024-01-30T04:11:36.513Z"),
        "paymentAmount": 3415.49,
        "paymentStatusID": 5,
        "paymentMethodID": 5,
        "balance": 2453.18,
        "reversalDate": new Date(null),
        "reversalReasonID": null,
        "clientCustomerID": 37305,
        "notes": "Facilis nihil rerum dolorem expedita.",
        "sourceFundingTransactionID": null,
        "transactionKey": 9059
      },
      {
        "iD": 24639,
        "paymentSourceID": 24437,
        "clientID": 4112,
        "paymentNumber": "36603222",
        "paymentDate": new Date(null),
        "paymentAmount": 8516.18,
        "paymentStatusID": null,
        "paymentMethodID": 2,
        "balance": 7969.91,
        "reversalDate": new Date("2024-02-09T12:12:03.304Z"),
        "reversalReasonID": null,
        "clientCustomerID": 21667,
        "notes": null,
        "sourceFundingTransactionID": 52151,
        "transactionKey": 814
      },
      {
        "iD": 93456,
        "paymentSourceID": 53412,
        "clientID": 29110,
        "paymentNumber": null,
        "paymentDate": new Date(null),
        "paymentAmount": 8541.17,
        "paymentStatusID": null,
        "paymentMethodID": 3,
        "balance": 1995.66,
        "reversalDate": new Date("2024-04-19T20:31:58.333Z"),
        "reversalReasonID": 10,
        "clientCustomerID": null,
        "notes": null,
        "sourceFundingTransactionID": null,
        "transactionKey": 96853
      },
      {
        "iD": 53840,
        "paymentSourceID": null,
        "clientID": null,
        "paymentNumber": "55275121",
        "paymentDate": new Date(null),
        "paymentAmount": 2157.46,
        "paymentStatusID": 2,
        "paymentMethodID": null,
        "balance": 872.15,
        "reversalDate": new Date("2024-01-02T10:22:30.744Z"),
        "reversalReasonID": null,
        "clientCustomerID": null,
        "notes": null,
        "sourceFundingTransactionID": 30674,
        "transactionKey": 21715
      }
    ];
  }

  private getMockReleasedPaymentDetails(): PaymentDetails[] {
    return [
      {
        "customerName": "Emanuel Douglas",
        "customerFullAddress": "6156 Annette Rest, Elizabeth, NY 98734-3219",
        "clientName": "Spencer, Schmeler and Ferry",
        "clientFullAddress": "81417 Feil Circle, East Bradshire, UT 25954-5504",
        "paymentMethodId": 2,
        "checkNumber": "49421628",
        "checkDate": new Date("2024-03-17T18:58:59.608Z"),
        "checkAmount": 5908.55,
        "payor": "Lila Mohr",
        "payerRefId": 11243,
        "bankNumber": "46243287",
        "bankBranch": "SECISXZ1",
        "payment": {
          "iD": 94281,
          "paymentSourceID": null,
          "clientID": null,
          "paymentNumber": null,
          "paymentDate": new Date("2024-04-30T15:35:57.202Z"),
          "paymentAmount": 2413.51,
          "paymentStatusID": 1,
          "paymentMethodID": null,
          "balance": 0,
          "reversalDate": new Date("2024-06-11T12:45:50.904Z"),
          "reversalReasonID": null,
          "clientCustomerID": null,
          "notes": "Et itaque pariatur aut.",
          "sourceFundingTransactionID": 7747,
          "transactionKey": 24336
        }
      },
      {
        "customerName": "Eugene Oberbrunner",
        "customerFullAddress": "758 Barrows Track, Sterling Heights, TX 09328-5418",
        "clientName": "White Inc",
        "clientFullAddress": "047 Sipes Station, New Leraberg, TX 59562",
        "paymentMethodId": 9,
        "checkNumber": "77524365",
        "checkDate": new Date("2024-03-28T11:38:47.626Z"),
        "checkAmount": 682.73,
        "payor": "Ruby Price",
        "payerRefId": 76871,
        "bankNumber": "76080224",
        "bankBranch": "VKZUEEV1",
        "payment": {
          "iD": 73050,
          "paymentSourceID": 46312,
          "clientID": 14156,
          "paymentNumber": null,
          "paymentDate": new Date("2024-01-24T01:14:15.634Z"),
          "paymentAmount": 7470.41,
          "paymentStatusID": null,
          "paymentMethodID": 5,
          "balance": 0,
          "reversalDate": new Date("2023-08-12T22:29:17.844Z"),
          "reversalReasonID": null,
          "clientCustomerID": null,
          "notes": "Iure officiis saepe aspernatur itaque accusamus fugit tempore quos.",
          "sourceFundingTransactionID": null,
          "transactionKey": 3957
        }
      },
      {
        "customerName": "Armando Cruickshank",
        "customerFullAddress": "24283 Collier Corner, Ronaldoburgh, ID 77932",
        "clientName": "Pfeffer Inc",
        "clientFullAddress": "84585 Mitchell Mission, Lake Nayeli, SD 29443",
        "paymentMethodId": 5,
        "checkNumber": "62122094",
        "checkDate": new Date("2024-02-09T00:06:54.789Z"),
        "checkAmount": 6274.67,
        "payor": "June Oberbrunner",
        "payerRefId": 54099,
        "bankNumber": "97151462",
        "bankBranch": "DUSEVUP1",
        "payment": {
          "iD": 92640,
          "paymentSourceID": 82479,
          "clientID": 66119,
          "paymentNumber": null,
          "paymentDate": null,
          "paymentAmount": 7331.94,
          "paymentStatusID": null,
          "paymentMethodID": null,
          "balance": 0,
          "reversalDate": new Date("2023-11-28T13:47:59.346Z"),
          "reversalReasonID": null,
          "clientCustomerID": null,
          "notes": null,
          "sourceFundingTransactionID": null,
          "transactionKey": 48025
        }
      },
      {
        "customerName": "Guy Waters",
        "customerFullAddress": "609 Manuela Turnpike, Roseville, AL 41823-0513",
        "clientName": "Funk - Rau",
        "clientFullAddress": "568 Medhurst Ramp, Tonawanda, AL 34256-1986",
        "paymentMethodId": 4,
        "checkNumber": "33900391",
        "checkDate": new Date("2024-06-08T08:01:26.203Z"),
        "checkAmount": 9139.53,
        "payor": "Mario Smith IV",
        "payerRefId": 14255,
        "bankNumber": "32462957",
        "bankBranch": "HKNESYL1",
        "payment": {
          "iD": 69627,
          "paymentSourceID": 45705,
          "clientID": null,
          "paymentNumber": null,
          "paymentDate": null,
          "paymentAmount": 2654.28,
          "paymentStatusID": null,
          "paymentMethodID": null,
          "balance": 0,
          "reversalDate": new Date("2024-01-16T22:07:29.751Z"),
          "reversalReasonID": null,
          "clientCustomerID": 26839,
          "notes": null,
          "sourceFundingTransactionID": 59835,
          "transactionKey": 36005
        }
      },
      {
        "customerName": "Cameron Keeling",
        "customerFullAddress": "8805 Hamill Island, East Malachi, MN 39683-4856",
        "clientName": "Price - Hermann",
        "clientFullAddress": "161 Steuber Street, Lake Alessandraview, SD 29681",
        "paymentMethodId": 9,
        "checkNumber": "11399332",
        "checkDate": new Date("2024-07-14T16:12:44.208Z"),
        "checkAmount": 5422.55,
        "payor": "Bridget Kirlin",
        "payerRefId": 94599,
        "bankNumber": "50972189",
        "bankBranch": "YEMAAQS1",
        "payment": {
          "iD": 88131,
          "paymentSourceID": null,
          "clientID": null,
          "paymentNumber": "83717018",
          "paymentDate": null,
          "paymentAmount": 6846.19,
          "paymentStatusID": null,
          "paymentMethodID": null,
          "balance": 0,
          "reversalDate": new Date("2023-09-02T03:17:52.883Z"),
          "reversalReasonID": null,
          "clientCustomerID": null,
          "notes": "Et ipsam sequi voluptatibus iure impedit suscipit consequatur.",
          "sourceFundingTransactionID": 48559,
          "transactionKey": 42079
        }
      },
      {
        "customerName": "John Wilderman",
        "customerFullAddress": "586 Wilkinson Grove, Maggiehaven, SC 24436-9939",
        "clientName": "Smith Inc",
        "clientFullAddress": "5761 Orn Trafficway, Burnsville, WY 34260",
        "paymentMethodId": 8,
        "checkNumber": "23201967",
        "checkDate": new Date("2023-08-18T12:56:55.832Z"),
        "checkAmount": 6591.52,
        "payor": "Shirley Prosacco",
        "payerRefId": 85939,
        "bankNumber": "38296899",
        "bankBranch": "HVDUKHH1343",
        "payment": {
          "iD": 67960,
          "paymentSourceID": null,
          "clientID": null,
          "paymentNumber": null,
          "paymentDate": new Date("2023-08-13T09:56:18.661Z"),
          "paymentAmount": 8032.43,
          "paymentStatusID": null,
          "paymentMethodID": 7,
          "balance": 0,
          "reversalDate": new Date("2023-08-28T03:53:51.741Z"),
          "reversalReasonID": 1,
          "clientCustomerID": null,
          "notes": "Aut excepturi ut excepturi.",
          "sourceFundingTransactionID": null,
          "transactionKey": 28178
        }
      },
      {
        "customerName": "Damon Stokes",
        "customerFullAddress": "60527 Kiley Crossing, Lake Maxiechester, VA 81862-7087",
        "clientName": "Walter Inc",
        "clientFullAddress": "99345 Zakary Oval, Port Reyesbury, FL 86202-0818",
        "paymentMethodId": 1,
        "checkNumber": "89449483",
        "checkDate": new Date("2024-07-27T21:17:22.232Z"),
        "checkAmount": 129.16,
        "payor": "Shawn Haag DDS",
        "payerRefId": 90650,
        "bankNumber": "45182532",
        "bankBranch": "VYQICCQ1",
        "payment": {
          "iD": 796,
          "paymentSourceID": 52527,
          "clientID": 58926,
          "paymentNumber": null,
          "paymentDate": new Date("2023-10-25T18:18:58.398Z"),
          "paymentAmount": 8420.7,
          "paymentStatusID": null,
          "paymentMethodID": 10,
          "balance": 0,
          "reversalDate": new Date("2024-01-22T05:36:31.171Z"),
          "reversalReasonID": null,
          "clientCustomerID": null,
          "notes": "Suscipit dolorem reiciendis asperiores vero est ex corporis beatae.",
          "sourceFundingTransactionID": null,
          "transactionKey": 56418
        }
      },
      {
        "customerName": "Alexis Prosacco",
        "customerFullAddress": "1940 Toy Plaza, Emanueltown, NV 21667-4763",
        "clientName": "Larson, Smith and Kertzmann",
        "clientFullAddress": "4889 Alek Summit, Anderson, NC 59309-5973",
        "paymentMethodId": 7,
        "checkNumber": "08185390",
        "checkDate": new Date("2023-08-18T12:05:00.515Z"),
        "checkAmount": 4121.03,
        "payor": "Mr. Nettie Ledner",
        "payerRefId": 91296,
        "bankNumber": "68540395",
        "bankBranch": "LWWUMUW1517",
        "payment": {
          "iD": 38438,
          "paymentSourceID": 45804,
          "clientID": null,
          "paymentNumber": null,
          "paymentDate": null,
          "paymentAmount": 5785.84,
          "paymentStatusID": null,
          "paymentMethodID": null,
          "balance": 0,
          "reversalDate": null,
          "reversalReasonID": 1,
          "clientCustomerID": null,
          "notes": null,
          "sourceFundingTransactionID": null,
          "transactionKey": 4552
        }
      },
      {
        "customerName": "Bobbie Johns",
        "customerFullAddress": "1844 Bartholome Gardens, West Concepcion, WY 49041",
        "clientName": "Ortiz, Jast and Harris",
        "clientFullAddress": "3846 Raven Mill, Hermannbury, IA 36113",
        "paymentMethodId": 9,
        "checkNumber": "23194919",
        "checkDate": new Date("2024-04-01T12:40:16.889Z"),
        "checkAmount": 9121.56,
        "payor": "Patti Bartoletti",
        "payerRefId": 44807,
        "bankNumber": "61531769",
        "bankBranch": "XCBORUT1464",
        "payment": {
          "iD": 44077,
          "paymentSourceID": null,
          "clientID": 67890,
          "paymentNumber": null,
          "paymentDate": new Date("2023-11-07T06:15:12.088Z"),
          "paymentAmount": 2134.73,
          "paymentStatusID": 2,
          "paymentMethodID": 10,
          "balance": 0,
          "reversalDate": null,
          "reversalReasonID": null,
          "clientCustomerID": null,
          "notes": "Inventore excepturi asperiores ea.",
          "sourceFundingTransactionID": null,
          "transactionKey": 44139
        }
      },
      {
        "customerName": "Jeanette Murray",
        "customerFullAddress": "85722 Roderick Loop, Lake Geneshire, PA 87394",
        "clientName": "Roob - Halvorson",
        "clientFullAddress": "31653 Emmet Highway, Fadeltown, WA 76363",
        "paymentMethodId": 4,
        "checkNumber": "52493351",
        "checkDate": new Date("2024-02-06T20:56:50.957Z"),
        "checkAmount": 2427.71,
        "payor": "Adrienne Gutmann",
        "payerRefId": 12850,
        "bankNumber": "14403595",
        "bankBranch": "AYPENPO1504",
        "payment": {
          "iD": 83060,
          "paymentSourceID": 82246,
          "clientID": 38967,
          "paymentNumber": "55416788",
          "paymentDate": new Date("2024-01-21T00:59:19.260Z"),
          "paymentAmount": 2492.91,
          "paymentStatusID": 1,
          "paymentMethodID": null,
          "balance": 0,
          "reversalDate": null,
          "reversalReasonID": 1,
          "clientCustomerID": null,
          "notes": null,
          "sourceFundingTransactionID": null,
          "transactionKey": 43394
        }
      }
    ];
  }

  private getMockUnreleasedPaymentDetails(): PaymentDetails[] {
    return [
      {
        "customerName": "Clay Dietrich",
        "customerFullAddress": "64698 Flatley Drive, Anderson, SC 21385-8250",
        "clientName": "Luettgen - Kulas",
        "clientFullAddress": "17709 Cornell Trafficway, West Oma, OR 70318-4682",
        "paymentMethodId": 7,
        "checkNumber": "11453424",
        "checkDate": new Date("2023-09-24T18:07:28.264Z"),
        "checkAmount": 9793.72,
        "payor": "Robyn Veum",
        "payerRefId": 34796,
        "bankNumber": "75545185",
        "bankBranch": "NZQIPFM1118",
        "payment": {
          "iD": 66454,
          "paymentSourceID": 993,
          "clientID": null,
          "paymentNumber": null,
          "paymentDate": null,
          "paymentAmount": 8343.67,
          "paymentStatusID": null,
          "paymentMethodID": null,
          "balance": 7497.29,
          "reversalDate": new Date("2023-08-16T01:40:52.456Z"),
          "reversalReasonID": 9,
          "clientCustomerID": 24271,
          "notes": null,
          "sourceFundingTransactionID": 61420,
          "transactionKey": 21386
        }
      },
      {
        "customerName": "Lonnie Reinger",
        "customerFullAddress": "288 Lisette Rapids, Bristol, ME 73542-1731",
        "clientName": "Vandervort, Schroeder and Purdy",
        "clientFullAddress": "491 Olson Road, Franciscoview, TX 75324-6728",
        "paymentMethodId": 10,
        "checkNumber": "64144491",
        "checkDate": new Date("2024-05-08T10:26:16.720Z"),
        "checkAmount": 7959.99,
        "payor": "Charlotte Lowe",
        "payerRefId": 83060,
        "bankNumber": "65383546",
        "bankBranch": "FALIMLO1059",
        "payment": {
          "iD": 80973,
          "paymentSourceID": 32193,
          "clientID": null,
          "paymentNumber": "40184847",
          "paymentDate": null,
          "paymentAmount": 5460.22,
          "paymentStatusID": null,
          "paymentMethodID": null,
          "balance": 2259.38,
          "reversalDate": new Date("2024-01-12T23:24:42.765Z"),
          "reversalReasonID": 4,
          "clientCustomerID": 50484,
          "notes": "Rerum suscipit rerum.",
          "sourceFundingTransactionID": 3445,
          "transactionKey": 23847
        }
      },
      {
        "customerName": "Gwendolyn Schmeler",
        "customerFullAddress": "3800 Brianne Fields, Jaceyland, AR 05380-6800",
        "clientName": "Marquardt Group",
        "clientFullAddress": "419 Sporer Village, Alexandria, NV 25940",
        "paymentMethodId": 1,
        "checkNumber": "53479096",
        "checkDate": new Date("2023-11-05T17:35:35.727Z"),
        "checkAmount": 4952.49,
        "payor": "Wilbert Kreiger I",
        "payerRefId": 3700,
        "bankNumber": "23169778",
        "bankBranch": "DDUEJEJ1",
        "payment": {
          "iD": 24539,
          "paymentSourceID": 36886,
          "clientID": 97794,
          "paymentNumber": "04891446",
          "paymentDate": null,
          "paymentAmount": 3426.4,
          "paymentStatusID": 4,
          "paymentMethodID": null,
          "balance": 1968.81,
          "reversalDate": null,
          "reversalReasonID": 9,
          "clientCustomerID": 72145,
          "notes": null,
          "sourceFundingTransactionID": 23789,
          "transactionKey": 65796
        }
      },
      {
        "customerName": "Miss Clayton VonRueden",
        "customerFullAddress": "5446 Kohler Neck, Schmidtfort, WV 33967",
        "clientName": "Ortiz, Altenwerth and Mills",
        "clientFullAddress": "9528 Hermiston Stravenue, Benedictmouth, OK 37117-3246",
        "paymentMethodId": 2,
        "checkNumber": "23871143",
        "checkDate": new Date("2024-06-11T04:36:52.456Z"),
        "checkAmount": 9615.21,
        "payor": "June Braun",
        "payerRefId": 21013,
        "bankNumber": "77354982",
        "bankBranch": "RXNETCE1509",
        "payment": {
          "iD": 97391,
          "paymentSourceID": 98472,
          "clientID": 53486,
          "paymentNumber": null,
          "paymentDate": null,
          "paymentAmount": 4450.56,
          "paymentStatusID": null,
          "paymentMethodID": 9,
          "balance": 619.43,
          "reversalDate": null,
          "reversalReasonID": null,
          "clientCustomerID": null,
          "notes": "Exercitationem consequatur aut dignissimos et.",
          "sourceFundingTransactionID": 92750,
          "transactionKey": 91512
        }
      },
      {
        "customerName": "Dr. Lawrence Thiel",
        "customerFullAddress": "03443 Ayana Tunnel, Russellstad, NY 38555-4293",
        "clientName": "Lowe - Rogahn",
        "clientFullAddress": "354 Lavina River, Eliezerside, MI 68167",
        "paymentMethodId": 10,
        "checkNumber": "37714342",
        "checkDate": new Date("2024-06-04T03:08:20.722Z"),
        "checkAmount": 168.10,
        "payor": "Salvatore Hagenes",
        "payerRefId": 35326,
        "bankNumber": "52781415",
        "bankBranch": "SKGONGH1",
        "payment": {
          "iD": 97280,
          "paymentSourceID": 95323,
          "clientID": 58069,
          "paymentNumber": null,
          "paymentDate": null,
          "paymentAmount": 2104.67,
          "paymentStatusID": null,
          "paymentMethodID": 5,
          "balance": 811.57,
          "reversalDate": new Date("2024-03-04T12:41:53.012Z"),
          "reversalReasonID": null,
          "clientCustomerID": null,
          "notes": "Distinctio deleniti voluptas optio omnis dolores assumenda explicabo tempore.",
          "sourceFundingTransactionID": null,
          "transactionKey": 43724
        }
      },
      {
        "customerName": "Ernestine McGlynn II",
        "customerFullAddress": "32646 Winnifred Rest, Willmsmouth, AR 36489",
        "clientName": "Schamberger Group",
        "clientFullAddress": "893 Shanel Wells, New Willamouth, AR 65484-7075",
        "paymentMethodId": 8,
        "checkNumber": "17847560",
        "checkDate": new Date("2024-03-28T15:10:08.019Z"),
        "checkAmount": 1542.09,
        "payor": "Doug Jakubowski",
        "payerRefId": 79178,
        "bankNumber": "09573998",
        "bankBranch": "EZJUACN1",
        "payment": {
          "iD": 66150,
          "paymentSourceID": 27874,
          "clientID": null,
          "paymentNumber": null,
          "paymentDate": new Date("2024-07-08T14:46:15.502Z"),
          "paymentAmount": 8378.45,
          "paymentStatusID": null,
          "paymentMethodID": null,
          "balance": 2383.38,
          "reversalDate": null,
          "reversalReasonID": 7,
          "clientCustomerID": null,
          "notes": "Tempora et nihil.",
          "sourceFundingTransactionID": null,
          "transactionKey": 17957
        }
      },
      {
        "customerName": "Jessie O'Conner Jr.",
        "customerFullAddress": "642 Taya Glen, Parker, IN 83635",
        "clientName": "Mann - Gutkowski",
        "clientFullAddress": "213 Hills Overpass, Hilllside, UT 75040-5983",
        "paymentMethodId": 5,
        "checkNumber": "15432437",
        "checkDate": new Date("2024-07-28T09:22:10.308Z"),
        "checkAmount": 8946.14,
        "payor": "Ricky Morissette",
        "payerRefId": 58887,
        "bankNumber": "54847493",
        "bankBranch": "EHPOHMC1",
        "payment": {
          "iD": 81159,
          "paymentSourceID": 68573,
          "clientID": null,
          "paymentNumber": "45785276",
          "paymentDate": new Date("2024-05-21T09:43:14.064Z"),
          "paymentAmount": 684.94,
          "paymentStatusID": null,
          "paymentMethodID": null,
          "balance": 92.69,
          "reversalDate": null,
          "reversalReasonID": null,
          "clientCustomerID": null,
          "notes": null,
          "sourceFundingTransactionID": null,
          "transactionKey": 14520
        }
      },
      {
        "customerName": "Michelle Kunde",
        "customerFullAddress": "8486 Stamm Walk, Lakinland, SC 53080",
        "clientName": "Roob - Krajcik",
        "clientFullAddress": "627 Windler Station, Pueblo, WA 22293-5923",
        "paymentMethodId": 1,
        "checkNumber": "64891570",
        "checkDate": new Date("2024-01-27T04:34:24.654Z"),
        "checkAmount": 8299.10,
        "payor": "Essie Keebler",
        "payerRefId": 91160,
        "bankNumber": "56235704",
        "bankBranch": "NSSEKIO1",
        "payment": {
          "iD": 43499,
          "paymentSourceID": 74123,
          "clientID": 45162,
          "paymentNumber": null,
          "paymentDate": null,
          "paymentAmount": 575.41,
          "paymentStatusID": null,
          "paymentMethodID": null,
          "balance": 345.62,
          "reversalDate": new Date("2023-11-02T20:37:26.865Z"),
          "reversalReasonID": 3,
          "clientCustomerID": null,
          "notes": "Voluptatem nobis nesciunt provident ipsam quam suscipit.",
          "sourceFundingTransactionID": 51127,
          "transactionKey": 40675
        }
      },
      {
        "customerName": "Lorraine Tillman",
        "customerFullAddress": "8317 Padberg Centers, Lake Jamesonfort, KS 75293-1858",
        "clientName": "Greenholt Group",
        "clientFullAddress": "30837 Kulas Junction, South Dejah, TN 96106",
        "paymentMethodId": 10,
        "checkNumber": "46372842",
        "checkDate": new Date("2024-07-02T08:09:21.063Z"),
        "checkAmount": 7938.42,
        "payor": "Mr. Jan Rolfson",
        "payerRefId": 89377,
        "bankNumber": "66217195",
        "bankBranch": "UPTAICC1013",
        "payment": {
          "iD": 38544,
          "paymentSourceID": null,
          "clientID": 35285,
          "paymentNumber": "28125827",
          "paymentDate": null,
          "paymentAmount": 6254.87,
          "paymentStatusID": 3,
          "paymentMethodID": null,
          "balance": 106.96,
          "reversalDate": null,
          "reversalReasonID": 8,
          "clientCustomerID": 65770,
          "notes": null,
          "sourceFundingTransactionID": null,
          "transactionKey": 82386
        }
      },
      {
        "customerName": "Glenda Harber DVM",
        "customerFullAddress": "7655 McKenzie Prairie, Kaelynton, NE 23165-0734",
        "clientName": "Keeling, Toy and Mann",
        "clientFullAddress": "19478 Keyshawn Curve, Wolfmouth, OR 83912-7563",
        "paymentMethodId": 8,
        "checkNumber": "77909808",
        "checkDate": new Date("2024-06-25T11:33:14.711Z"),
        "checkAmount": 2187.26,
        "payor": "Amber Abshire I",
        "payerRefId": 75918,
        "bankNumber": "70600699",
        "bankBranch": "ANBEVIS1",
        "payment": {
          "iD": 9602,
          "paymentSourceID": 58880,
          "clientID": 54215,
          "paymentNumber": null,
          "paymentDate": new Date("2024-02-13T04:56:10.526Z"),
          "paymentAmount": 5720.48,
          "paymentStatusID": 3,
          "paymentMethodID": null,
          "balance": 629.94,
          "reversalDate": null,
          "reversalReasonID": null,
          "clientCustomerID": null,
          "notes": "Voluptatibus deserunt enim voluptatibus eligendi et ullam et a.",
          "sourceFundingTransactionID": null,
          "transactionKey": 88888
        }
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
