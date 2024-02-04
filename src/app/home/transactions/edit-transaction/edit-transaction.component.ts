import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss'],
})
export class EditTransactionComponent {
  editTransactionForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditTransactionComponent>,
    private fb: FormBuilder
  ) {
    console.log('data', data);
    this.editTransactionForm = this.fb.group({
      customerName: [
        { value: data.customerName, disabled: true },
        ,
        Validators.required,
      ],
      addedBy: [{ value: data.addedBy, disabled: true }, Validators.required],
      youGave: [
        data.amount < 0 ? data.amount.replace('-', '') : 0,
        Validators.required,
      ],
      youGot: [data.amount > 0 ? data.amount : 0, Validators.required],
      description: [data.description, Validators.required],
    });
  }

  get gf() {
    return this.editTransactionForm.controls;
  }
  closeDialog() {
    this.dialogRef.close(false);
  }

  editTransaction() {
    let newRecord = {
      customerId: this.data.customerId,
      transactionId: this.data.transactionId,
      date: this.data.date,
      customerName: this.editTransactionForm.value.customerName,
      description: this.editTransactionForm.value.description,
      addedBy: this.editTransactionForm.value.addedBy,
      amount: (
        this.editTransactionForm.value.youGot -
        this.editTransactionForm.value.youGave
      ).toString(),
      createdTime: this.data.createdTime,
    };
    this.dialogRef.close(newRecord);
  }
}
