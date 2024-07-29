import { Injectable } from '@angular/core';
import { IApiResponse, PaymentService } from './payment.service';
import { AtradiusPaymentPayorResponseEntity, AtradiusPaymnetPayorPayload, ClientPaymentPayorPayload, ClientPaymentPayorResponseEntity, CustomerPaymentPayorPayload, CustomerPaymentPayorResponseEntity } from '../../types/payment-find-payor.type';

@Injectable({
  providedIn: 'root'
})
export class PaymentFindPayorService {
  private clientSearchResults: ClientPaymentPayorResponseEntity[] = [];
  private customerSearchResults: CustomerPaymentPayorResponseEntity[] = [];

  constructor(private pms: PaymentService) { }

  async getAtradiusPayorEntity(
    searchPayload: AtradiusPaymnetPayorPayload,
  ): Promise<IApiResponse<AtradiusPaymentPayorResponseEntity>> {
    const entity =new AtradiusPaymentPayorResponseEntity();
    entity.payorClientId = 90210;
    entity.payorClientName = 'Atradius';
    return this.pms.getMockIApiResponse<AtradiusPaymentPayorResponseEntity>(
      entity
    );
  }

  async getClientPayorEntities(
    searchPayload: ClientPaymentPayorPayload,
  ): Promise<IApiResponse<ClientPaymentPayorResponseEntity[]>> {
    // use search payload for filtering on API side
    let result = this.getMockClientPayorEntities(searchPayload);
    this.clientSearchResults = result;
    return this.pms.getMockIApiResponse(
      result
    )
  }

  async getCustomerPayorEntities(
    searchPayload: CustomerPaymentPayorPayload,
  ): Promise<IApiResponse<CustomerPaymentPayorResponseEntity[]>> {
    let result = this.getMockCustomerPayorEntities(searchPayload);
    this.customerSearchResults = result;
    return this.pms.getMockIApiResponse(result);
  }
  
  filterCustomerSearchResults(clientIds: number[]): CustomerPaymentPayorResponseEntity[] {
    if (clientIds.length === 0) return this.customerSearchResults;
    return this.customerSearchResults.filter(x => clientIds.includes(x.payorClientId));
  }  

  private getMockClientPayorEntities(searchPayload: ClientPaymentPayorPayload): ClientPaymentPayorResponseEntity[] {
    return [
      {
        "payorClientId": 45407,
        "payorClientName": "Lowe - Schmidt"
      },
      {
        "payorClientId": 42344,
        "payorClientName": "Gaylord, Hayes and Schmitt"
      },
      {
        "payorClientId": 62790,
        "payorClientName": "Marks - Armstrong"
      },
      {
        "payorClientId": 31469,
        "payorClientName": "Rempel - Altenwerth"
      },
      {
        "payorClientId": 19941,
        "payorClientName": "Ryan Inc"
      },
      {
        "payorClientId": 14706,
        "payorClientName": "Nitzsche - Yundt"
      },
      {
        "payorClientId": 66750,
        "payorClientName": "Runolfsdottir - Herman"
      },
      {
        "payorClientId": 66102,
        "payorClientName": "Roob LLC"
      },
      {
        "payorClientId": 95154,
        "payorClientName": "Herzog - Lesch"
      },
      {
        "payorClientId": 52944,
        "payorClientName": "Wilkinson, Metz and Farrell"
      }
    ];
  };

  private getMockCustomerPayorEntities(searchPayload: CustomerPaymentPayorPayload): CustomerPaymentPayorResponseEntity[] {
    return [
      {
        "payorClientId": 45407,
        "payorClientName": "Lowe - Schmidt",
        "payorClientCustomerId": 41055,
        "payorClientCustomerName": "Corey Romaguera"
      },
      {
        "payorClientId": 42344,
        "payorClientName": "Gaylord, Hayes and Schmitt",
        "payorClientCustomerId": 44134,
        "payorClientCustomerName": "Miss Wendy Goodwin"
      },
      {
        "payorClientId": 62790,
        "payorClientName": "Marks - Armstrong",
        "payorClientCustomerId": 78171,
        "payorClientCustomerName": "Oliver Parisian"
      },
      {
        "payorClientId": 31469,
        "payorClientName": "Rempel - Altenwerth",
        "payorClientCustomerId": 54799,
        "payorClientCustomerName": "Natalie Bartell"
      },
      {
        "payorClientId": 19941,
        "payorClientName": "Ryan Inc",
        "payorClientCustomerId": 54796,
        "payorClientCustomerName": "Adam Bode"
      },
      {
        "payorClientId": 14706,
        "payorClientName": "Nitzsche - Yundt",
        "payorClientCustomerId": 4019,
        "payorClientCustomerName": "Ginger Powlowski"
      },
      {
        "payorClientId": 66750,
        "payorClientName": "Runolfsdottir - Herman",
        "payorClientCustomerId": 69594,
        "payorClientCustomerName": "Orville Dare"
      },
      {
        "payorClientId": 66102,
        "payorClientName": "Roob LLC",
        "payorClientCustomerId": 58676,
        "payorClientCustomerName": "Toni Lubowitz"
      },
      {
        "payorClientId": 95154,
        "payorClientName": "Herzog - Lesch",
        "payorClientCustomerId": 88324,
        "payorClientCustomerName": "Emily Muller"
      },
      {
        "payorClientId": 52944,
        "payorClientName": "Wilkinson, Metz and Farrell",
        "payorClientCustomerId": 80359,
        "payorClientCustomerName": "Jeannie Stroman"
      }
    ];
  }
}
