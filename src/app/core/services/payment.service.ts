import { Injectable } from '@angular/core';
import { PaymentDocument } from '../../types/payment-document.type';
import { PaymentSource } from '../../types/payment-source.type';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor() {}

  async getPaymentDocuments(): Promise<IApiResponse<PaymentDocument[]>> {
    return this.getMockIApiResponse(this.getMockPaymentDocuments());
  }

  async getPaymentSources(): Promise<IApiResponse<PaymentSource[]>> {
    const result = await this.getMockIApiResponse(this.getMockPaymentSources());
    result.data.unshift({ name: 'Pick the Payment Source', value: -1 });
    return result;
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
}

export interface IApiResponse<T = any> {
  statusCode: number; // 400 client-side failure -> show in UI for validation
  message: string;
  isSuccessful: boolean;
  data: T;
  exception: object;
  errors: any[]; // list of errors with specfic messages, use for client-side errors
}
