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
      customerName: ['', Validators.required],
      addedBy: ['', Validators.required],
      youGave: ['', Validators.required],
      youGot: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get gf(){
    return this.editTransactionForm.controls
  }
  closeDialog(){
    this.dialogRef.close(this.data)
  }

  editTransaction(){

  }
}
