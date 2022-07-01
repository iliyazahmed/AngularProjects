import { MatInputModule } from '@angular/material/input';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CoinListComponent } from './coin-list/coin-list.component';
import { CoinDetailComponent } from './coin-detail/coin-detail.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    CoinListComponent,
    CoinDetailComponent,
  ],
  imports: [
    SharedModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    NgChartsModule
  ]
})
export class CoreModule { }
