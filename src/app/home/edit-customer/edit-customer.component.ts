import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/sevices/shared.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
})
export class EditCustomerComponent implements OnInit,OnChanges {
  @Input('customerDetails') customerDetails!: any;

  @Output('closeEditNav') closeEditNav = new EventEmitter<boolean>();
  @Output('detailsUpdated') detailsUpdated = new EventEmitter<any>();

  public options: string[] = [
    'Shibpur',
    'Esplanade',
    'Sarkar Bazar',
    'Salkia',
    'Central',
  ];
  public selectedOption: string = '';
  public customerDetailsCopy: any;

  editForm = new FormGroup({
    customerName: new FormControl('', Validators.required),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/),
    ]),
    locality: new FormControl('', [Validators.required]),
  });

  get customerName(): any {
    return this.editForm.get('customerName');
  }
  get phoneNo(): any {
    return this.editForm.get('phoneNo');
  }
  get locality() {
    return this.editForm.get('locality');
  }

  constructor(private services: SharedService) {}

  ngOnInit(): void { }
  

  onSelectedOption(option: string) {
    this.selectedOption = option;
    console.log(this.selectedOption);
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['customerDetails'].currentValue)
      this.customerDetailsCopy = JSON.parse(
        JSON.stringify(this.customerDetails)
      );
    
    if (changes['selectedOption']) {
      console.log(changes['selectedOption']);
      
    }
  }

  public updateCustomer() {
    this.services
      .updateCustomer(this.customerDetailsCopy, this.customerDetails.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.detailsUpdated.emit(this.customerDetailsCopy);
          this.closeEditNav.emit(true);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  public closeSideNav() {
    this.closeEditNav.emit(true);
  }
}


