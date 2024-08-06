import { Injectable } from '@angular/core';
import { IApiResponse, PaymentService } from './payment.service';
import { AtradiusPaymentPayorResponseEntity, AtradiusPaymnetPayorPayload, ClientCustomerSearchWidgetResponse, ClientNameSearchTerms, CustomerNameSearchTerms, InvoiceNumberSearchTerms, InvoiceNumberSearchWidgetResponse } from '../../types/payment-find-payor.type';
import { ResourceLoader } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PaymentFindPayorService {
  private clientSearchResults: ClientCustomerSearchWidgetResponse[] = [];
  private customerSearchResults: ClientCustomerSearchWidgetResponse[] = [];

  constructor(private pms: PaymentService) { }

  async getAtradiusPayorEntity(
    searchTerms: AtradiusPaymnetPayorPayload,
  ): Promise<IApiResponse<AtradiusPaymentPayorResponseEntity>> {
    const entity =new AtradiusPaymentPayorResponseEntity();
    entity.payorClientId = 90210;
    entity.payorClientName = 'Atradius';
    return this.pms.getMockIApiResponse<AtradiusPaymentPayorResponseEntity>(
      entity
    );
  }

  async doClientNameSearch(
    searchTerms: ClientNameSearchTerms,
  ): Promise<IApiResponse<ClientCustomerSearchWidgetResponse[]>> {
    // use search payload for filtering on API side
    let result = this.getMockCustomerPayorEntities(searchTerms);
    this.clientSearchResults = result;
    return this.pms.getMockIApiResponse(
      result
    )
  }

  async doCustomerNameSearch(
    searchTerms: CustomerNameSearchTerms,
  ): Promise<IApiResponse<ClientCustomerSearchWidgetResponse[]>> {
    let result = this.getMockCustomerPayorEntities(searchTerms);
    this.customerSearchResults = result;
    return this.pms.getMockIApiResponse(result);
  }

  async doInvoiceNumberSearch(
    searchTerms: InvoiceNumberSearchTerms,
  ): Promise<IApiResponse<InvoiceNumberSearchWidgetResponse[]>> {
    const response = await this.pms.getMockIApiResponse([]);
    return response;
  }
  
  filterCustomerSearchResults(clientIds: number[]): ClientCustomerSearchWidgetResponse[] {
    if (clientIds.length === 0) return this.customerSearchResults;
    return this.customerSearchResults.filter(x => clientIds.includes(x.clientId));
  }  

  private getMockCustomerPayorEntities(searchTerms: ClientNameSearchTerms | CustomerNameSearchTerms): ClientCustomerSearchWidgetResponse[] {
    return [
      {
        "clientId": 45407,
        "clientName": "Lowe - Schmidt",
        "clientCustomerId": 41055,
        "clientCustomerName": "Corey Romaguera"
      },
      {
        "clientId": 42344,
        "clientName": "Gaylord, Hayes and Schmitt",
        "clientCustomerId": 44134,
        "clientCustomerName": "Miss Wendy Goodwin"
      },
      {
        "clientId": 62790,
        "clientName": "Marks - Armstrong",
        "clientCustomerId": 78171,
        "clientCustomerName": "Oliver Parisian"
      },
      {
        "clientId": 31469,
        "clientName": "Rempel - Altenwerth",
        "clientCustomerId": 54799,
        "clientCustomerName": "Natalie Bartell"
      },
      {
        "clientId": 19941,
        "clientName": "Ryan Inc",
        "clientCustomerId": 54796,
        "clientCustomerName": "Adam Bode"
      },
      {
        "clientId": 14706,
        "clientName": "Nitzsche - Yundt",
        "clientCustomerId": 4019,
        "clientCustomerName": "Ginger Powlowski"
      },
      {
        "clientId": 66750,
        "clientName": "Runolfsdottir - Herman",
        "clientCustomerId": 69594,
        "clientCustomerName": "Orville Dare"
      },
      {
        "clientId": 66102,
        "clientName": "Roob LLC",
        "clientCustomerId": 58676,
        "clientCustomerName": "Toni Lubowitz"
      },
      {
        "clientId": 95154,
        "clientName": "Herzog - Lesch",
        "clientCustomerId": 88324,
        "clientCustomerName": "Emily Muller"
      },
      {
        "clientId": 52944,
        "clientName": "Wilkinson, Metz and Farrell",
        "clientCustomerId": 80359,
        "clientCustomerName": "Jeannie Stroman"
      }
    ];
  }
}
