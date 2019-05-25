import { DataService } from './../_services/data-service';
import { Deposits } from './../_model/deposits';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.css']
})
export class DepositsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'bank name', 'date', 'check number', 'amount'];
  dataSource: MatTableDataSource<Deposits>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  deposits: Deposits[] = [];

  constructor(
    public appservice: DataService
  ) {
    this.getDeposits();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDeposits() {
    this.appservice.getDeposits().subscribe(data => {
      this.deposits = data;
      this.dataSource = new MatTableDataSource(data);
    });
}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



