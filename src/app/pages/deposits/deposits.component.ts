import { DataService } from './../_services/data-service';
import { Deposits } from './../_model/deposits';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.css']
})
export class DepositsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'bank name', 'date', 'cheque number', 'amount', 'actions'];
  dataSource: MatTableDataSource<Deposits>;
  banks: string[] = [
    'Cavmont Bank Limited',
    'Backlays Bank',
    'Stanbic Bank',
    'Indo Zambia Bank',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  deposits: Deposits[] = [];
  datFormGroup: FormGroup;
  validator: FormGroup;

  constructor(
    public appservice: DataService,
    public formBuilder: FormBuilder
  ) {
    this.getDeposits();
  }

  ngOnInit() {
   
    this.datFormGroup = this.formBuilder.group({
      cheque: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required],
      bank: ['', Validators.required]
    });
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
  addDeposit() {
    if (!this.datFormGroup.invalid) {
    console.log('values-----', this.datFormGroup.invalid);
    this.appservice.addDeposits(this.datFormGroup.value).subscribe(data => {
      // this.user = data;
      alert('New deposit was added successfully!!');
      console.log(data);
      this.datFormGroup.reset();
    });
    this.getDeposits();
  }
}

}



