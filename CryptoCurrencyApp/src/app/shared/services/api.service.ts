import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getCurrency(currency: string) {
    return this.httpClient.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`).pipe(map(data=> data));
  }
  getTrendingCurrency(currency: string) {
    return this.httpClient.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`);
  }

  getGraphicalCurrencyData(coinId: string, currency: string, days: number) {
    return this.httpClient.get<any>(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`);
  }

  getCurrencyById(coinId: string) {
    return this.httpClient.get<any>(`https://api.coingecko.com/api/v3/coins/${coinId}`);
  }

}
