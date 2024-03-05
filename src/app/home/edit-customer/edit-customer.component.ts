import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { In_options } from 'src/app/shared/interface/In_options';
import { SharedService } from 'src/app/shared/sevices/shared.service';
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
})
export class EditCustomerComponent implements OnInit, OnChanges {
  @Input('customerDetails') customerDetails?: any;
  @Output('closeEditNav') closeEditNav = new EventEmitter<boolean>();
  @Output('detailsUpdated') detailsUpdated = new EventEmitter<any>();

  filteredOptions: Observable<string[]> | undefined;
  editForm!: FormGroup;

  options: string[] = [
    'Shibpur',
    'Esplanade',
    'Sarkar Bazar',
    'Salkia',
    'central',
  ];

  constructor(private services: SharedService, private fb: FormBuilder) {
    this.initializeEditForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['customerDetails'].currentValue != undefined) {
      if (changes['customerDetails'].currentValue) {
        console.log(this.customerDetails);
        this.editForm.patchValue({
          ...this.customerDetails,
        });
      }
    }
  }

  ngOnInit(): void {
    console.log(this.customerDetails);

    this.filteredOptions = this.editForm.get('address')?.valueChanges.pipe(
      startWith(''),
      map((value) => this._filteraddress(value || ''))
    );
  }
  
  initializeEditForm() {
    this.editForm = this.fb.group({
      picture: [
        this.customerDetails?.picture ? this.customerDetails?.picture : '',
      ],
      name: [
        this.customerDetails?.name ? this.customerDetails?.name : '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]{2,30}$/)],
      ],
      address: [
        this.customerDetails?.address ? this.customerDetails?.address : '',
        Validators.required,
      ],
      phone: [
        this.customerDetails?.phone ? this.customerDetails?.phone : '',
        [
          Validators.min(1000000000),
          Validators.max(9999999999),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      aadharNumber: [
        this.customerDetails?.aadhar ? this.customerDetails?.aadhar : '',
      ],
    });
  }

  private _filteraddress(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option: any) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  get gf() {
    return this.editForm.controls;
  }


  profilePic(e: any) {
    this.gf['picture'].patchValue(e);
  }

  public updateCustomer() {
    console.log(this.editForm.value);

    let payload = {
      ...this.editForm.value,
      id: parseInt(this.customerDetails.id)
    }

    this.services
      .updateCustomer(payload)
      .subscribe({
        next: (res) => {
          if (res) {
            this.detailsUpdated.emit(this.editForm.value);
            this.closeSideNav();
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  public closeSideNav() {
    this.closeEditNav.emit(true);
  }

  onResetForm() {
    this.editForm.reset();
  }
}
