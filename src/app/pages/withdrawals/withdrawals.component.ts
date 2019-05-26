
import { DataService } from './../_services/data-service';
import { Deposits, Withdrawals } from './../_model/deposits';
import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WithdrawalsService } from '../_services/withdrawals.service';

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
  displayedColumns: string[] = ['id', 'bank name', 'date', 'amount', 'actions'];
  dataSource: MatTableDataSource<Withdrawals>;
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

  withdrawal: Withdrawals[] = [];
  datFormGroup: FormGroup;
  validator: FormGroup;

  constructor(
    public appservice: WithdrawalsService,
    public formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.getWithdrawals();
  }

  ngOnInit() {
    this.datFormGroup = this.formBuilder.group({
      amount: ['', Validators.required],
      date: ['', Validators.required],
      bank: ['', Validators.required]
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getWithdrawals() {
    this.appservice.getWithdrawals().subscribe(data => {
      this.withdrawal = data;
      this.dataSource = new MatTableDataSource(data);
    });
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
    this.appservice.add(this.datFormGroup.value).subscribe(data => {
      this.snackBar.open('New deposit was added successfully!!', '', {
        duration: 3000,
      });
      console.log(data);
      this.datFormGroup.reset();
    });
    this.getWithdrawals();
  }
}

delete(id) {
  console.log('id----', id);
  this.appservice.delete(id).subscribe(data => {
    this.getWithdrawals();
    this.snackBar.open('Deleted Successfully', '', {
      duration: 3000,
    });
  });

}


update(item) {
  console.log('items---000----', item);
    this.appservice.update(item).subscribe(data1 => {
      this.getWithdrawals();
      this.snackBar.open('Edited Successfully', '', {
        duration: 3000,
      });
  });
}

openDialog(item) {
  console.log('items-----00', item);
  const dialogRef = this.dialog.open(UpdateWidthdrawalComponent, {
    width: '500px',
    data: {withdrawals: item, banks: this.banks}
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




