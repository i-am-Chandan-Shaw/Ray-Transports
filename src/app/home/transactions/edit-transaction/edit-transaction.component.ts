import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss']
})
export class EditTransactionComponent {
  editTransactionForm:FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditTransactionComponent>,private fb:FormBuilder){
    console.log("data",data)
    this.editTransactionForm = this.fb.group({
      customerName: [data.customerName, Validators.required],
      addedBy: [data.addedBy, Validators.required],
      youGave: [data.amount<0?data.amount.replace('-',''):0, Validators.required],
      youGot: [data.amount>0?data.amount:0, Validators.required],
      description: [data.description, Validators.required],
    });
  }

  get gf(){
    return this.editTransactionForm.controls
  }
  closeDialog(){
    this.dialogRef.close(this.data)
  }

  editTransaction(){
    this.dialogRef.close(this.editTransactionForm.value)
  }
}