import { CurrencyService } from './../../shared/services/currency.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  tittle = "Crypto-Currency-Checker";

  selectedCurrency : string = "INR";

  constructor(private currencyService:CurrencyService) { }

  ngOnInit(): void {
  }

  sendCurrency(event:string){
    console.log(event);
    this.currencyService.setCurrency(event);
  }

}
