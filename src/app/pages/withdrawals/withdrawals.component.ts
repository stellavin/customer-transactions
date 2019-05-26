
import { DataService } from './../_services/data-service';
import { Deposits } from './../_model/deposits';
import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface DialogData {
  cheque: string;
  amount: Number;
}
@Component({
  selector: 'app-withdrawals',
  templateUrl: './withdrawals.component.html',
  styleUrls: ['./withdrawals.component.css']
})
export class WithdrawalsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'bank name', 'date', 'cheque number', 'amount', 'actions'];
  dataSource: MatTableDataSource<Deposits>;
  banks: string[] = [
    'Cavmont Bank Limited',
    'Backlays Bank',
    'Stanbic Bank',
    'Indo Zambia Bank',
  ];
  cheque: string;
  amount: Number;

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
  const dialogRef = this.dialog.open(UpdateWidthdrawalComponent, {
    width: '500px',
    data: {deposits: item, banks: this.banks}
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
export class UpdateWidthdrawalComponent {

  constructor(
    public dialogRef2: MatDialogRef<UpdateWidthdrawalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData ) { }

    update2(): void {
      console.log('items---to---update--');
      this.dialogRef2.close(true);
    }
}




