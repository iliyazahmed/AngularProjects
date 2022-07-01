import { CurrencyService } from './../../shared/services/currency.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {
  bannerData: any = [];
  dataSource !: MatTableDataSource<any>;
  currencyType : string = "INR";
  displayedColumns : string[] = ['symbol','id','current_price','price_change_percentage_24h','market_cap'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private apiService: ApiService,private router:Router,private currencyService : CurrencyService) { }

  ngOnInit(): void {
    this.getAllData();
    this.getBannerData();
    this.currencyService.getCurrency().subscribe(val =>{
      this.currencyType = val;
      this.getAllData();
      this.getBannerData();
    })
  }

  getBannerData() {
    this.apiService.getTrendingCurrency(this.currencyType).subscribe(res => {
      console.log(res);
      this.bannerData = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  getAllData() {
    this.apiService.getCurrency(this.currencyType).subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCoinDetail(row:any){
     this.router.navigate(['coin-detail',row.id]);
  }
}
