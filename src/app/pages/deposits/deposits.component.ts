
import { DataService } from './../_services/data-service';
import { Deposits } from './../_model/deposits';
import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
export interface DialogData {
  type: string;
  amount: Number;
}
@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.css']
})
export class DepositsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'bank name', 'date', 'type', 'amount', 'actions'];
  dataSource: MatTableDataSource<Deposits>;
  types: string[] = [
    'Deposit',
    'Withdrawal'
  ];
  type: string;
  amount: Number;
  deposit: any;
  withdrawal: any;
  total: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  deposits: Deposits[] = [];
  datFormGroup: FormGroup;
  validator: FormGroup;

  constructor(
    public appservice: DataService,
    public formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.getDeposits();
  }

  ngOnInit() {
    this.datFormGroup = this.formBuilder.group({
      type: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required],
      bank: ['Zambia Bank']
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDeposits() {
    this.appservice.getDeposits().subscribe(data => {
      this.deposits = data;
      this.calculateAmount(data);
      console.log('data---', data);
      this.dataSource = new MatTableDataSource(data);
    });
}

calculateAmount(array) {
  const newArray = array.map(item => {
    if (item.type === 'Deposit') {
      return item.amount;
    }
  });
  this.deposit = _.sum(newArray);
  const newArray2 = array.map(item => {
    if (item.type === 'Withdrawal') {
      return item.amount;
    }
  });
  this.withdrawal = _.sum(newArray2);
  console.log(this.deposit);
  console.log(this.withdrawal);
  this.total = this.deposit - this.withdrawal;
 console.log(this.total);

}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  add() {
    if (!this.datFormGroup.invalid) {
    console.log('values-----', this.datFormGroup.invalid);
    this.appservice.addDeposits(this.datFormGroup.value).subscribe(data => {
      this.snackBar.open('New deposit was added successfully!!', '', {
        duration: 3000,
      });
      console.log(data);
      this.datFormGroup.reset();
    });
    this.getDeposits();
  }
}

delete(id) {
  console.log('id----', id);
  this.appservice.delete(id).subscribe(data => {
    this.getDeposits();
    this.snackBar.open('Deleted Successfully', '', {
      duration: 3000,
    });
  });

}


update(item) {
  console.log('items---000----', item);
    this.appservice.update(item).subscribe(data1 => {
      this.getDeposits();
      this.snackBar.open('Edited Successfully', '', {
        duration: 3000,
      });
  });
}

openDialog(item) {
  console.log('items-----00', item);
  const dialogRef = this.dialog.open(UpdateComponent, {
    width: '500px',
    data: {deposits: item, types: this.types}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`, item);
    if (result !== true) {
      this.update(item);
    }
  });
}

}

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
})
export class UpdateComponent {

  constructor(
    public dialogRef2: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData ) { }

    update2(): void {
      console.log('items---to---update--');
      this.dialogRef2.close(true);
    }
}




