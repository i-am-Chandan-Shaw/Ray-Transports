import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { In_options } from 'src/app/shared/interface/In_options';
import { SharedService } from 'src/app/shared/sevices/shared.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
})
export class EditCustomerComponent implements OnChanges {
  @Input('customerDetails') customerDetails!: any;

  @Output('closeEditNav') closeEditNav = new EventEmitter<boolean>();
  @Output('detailsUpdated') detailsUpdated = new EventEmitter<any>();

  // public options: string[] = [
  //   'Shibpur',
  //   'Esplanade',
  //   'Sarkar Bazar',
  //   'Salkia',
  //   'Central',
  // ];

  public options: In_options[] = [
    {
      id: 1,
      displayName: 'Shibpur',
      value: 'shibpur',
    },
    {
      id: 2,
      displayName: 'Esplanade',
      value: 'esplanade',
    },
    {
      id: 3,
      displayName: 'Sarkar Bazar',
      value: 'sarkarBazar',
    },
    {
      id: 4,
      displayName: 'Salkia',
      value: 'salkia',
    },
    {
      id: 5,
      displayName: 'Central',
      value: 'central',
    },
    {
      id: 6,
      displayName: 'Chandani',
      value: 'chandani',
    },
  ];
  public selectedOption?: In_options;
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

  onSelectedOption(option: In_options) {
    this.selectedOption = option;
    this.customerDetailsCopy.address=option.displayName
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['customerDetails'].currentValue)
      this.customerDetailsCopy = JSON.parse(
        JSON.stringify(this.customerDetails)
      );
    console.log(this.customerDetailsCopy);
    

    if (changes['selectedOption']) {
      console.log(changes['selectedOption']);
    }
  }

  public updateCustomer() {
    this.services
      .updateCustomer(this.customerDetailsCopy, this.customerDetails.id)
      .subscribe({
        next: (res) => {
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


